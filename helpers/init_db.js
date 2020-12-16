require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL ,{
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Mongodb connected successfully !!')
}).catch((err)=>{
    console.log(err.message)
})

const db = mongoose.connection
db.on('connected',()=>{
    console.log('mongodb is connecting..')
})

db.on('error',(err)=>{
    console.log(err.messsage)
})
db.on('disconnected',()=>{
    console.log('Mongodb disconnected now...')
})

process.on('SIGINT',async()=>{
    await db.close()
    process.exit(0)
})
