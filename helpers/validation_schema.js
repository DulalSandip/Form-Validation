const Joi = require('joi')

// regex= (((\+){1}977))-?{1}[9]{1}[0-9]{9}

const registerSchema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    date_of_birth: Joi.date().required(),
    phone: Joi.string().pattern(/^(((\+){1}977){1})-[9]{1}[0-9]{9}$/).required(),
    email: Joi.string().email().required(),
    roles : Joi.string().required()
})

module.exports={
    registerSchema
}
