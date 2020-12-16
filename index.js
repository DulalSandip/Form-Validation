const express = require('express')
const morgan = require('morgan')

const createErrors = require('http-errors') //http errors handle the errors else throw the good request itself
require('./helpers/init_db')


const app= express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//enabling CORS on server side
app.use(async(req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(morgan('dev'))

//calling the registration route
const registrationRoute = require('./route/Registration.route')

app.use('/users',registrationRoute)


app.use(async(req,res,next)=>{
    next(createErrors.NotFound())

})

//Error handler
app.use(async(err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
})


//listening port 

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Running succesfully on port ${PORT}`)
})
