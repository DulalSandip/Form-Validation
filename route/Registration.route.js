const express = require('express')

const router = express.Router()

const createErrors = require('http-errors')
const {registerSchema} = require('../helpers/validation_schema')
const User = require('../model/User.model')

router.post('/api/registration', async(req,res,next)=>{
    try{
        const result = await registerSchema.validateAsync(req.body)
        const doesExist = await User.findOne({email:result.email})
        if(doesExist)
            throw createErrors.Conflict(`${result.email} already exists`)
        
        const user = new User(result)
        const savedUser = await user.save()
        res.send(savedUser)
        
    }catch(err){
        if(err.isJoi === true) err.status=422
        console.log(err)
        next(err)
    }
   // res.send('hey reg')
})

router.get('/api/registration/:id',async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user) throw createErrors.NotFound()
        res.send(user)

    }catch(err){
        next(err)
    }

})

router.get('/api/registration/',async(req,res,next)=>{
    try{
        const user = await User.find(req.params.id)
        if(!user) throw createErrors.NotFound()
        res.send(user)

    }catch(err){
        next(err)
    }

})


module.exports = router
