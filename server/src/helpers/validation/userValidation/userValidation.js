const Joi = require('joi');

const formatValidationResponse = (error) => ({
    success: false,
    message: error.details.map(err => err.message).join(', '),
    data: null,
});

const userValidation = {
    signupSchema: () => Joi.object({
        firstName: Joi.string().required().messages({
            'string.empty': 'First name cannot be empty',
        }),
        lastName: Joi.string().required().messages({
            'string.empty': 'Last name cannot be empty',
        }),
        otherName: Joi.string().messages({
            
        }),
        email: Joi.string().email().required().messages({
            'string.empty': 'Email cannot be empty',
            'string.email': 'Invalid email format'
        }),
        password: Joi.string().min(5)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/)
            .required()
            .messages({
                'string.empty': 'Password cannot be empty',
                'string.min': 'Password must be at least 5 characters long',
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            }),
        confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .strict()
        .messages({
            'string.empty': 'Confirm Password cannot be empty',
            'any.only': 'Confirm password does not match password',
            'any.required': 'Confirm Password is required'
        }),
        termsAccepted: Joi.boolean().valid(true).required().messages({
            'any.only': 'You must accept the terms and conditions',
            'any.required': 'Terms acceptance is required'
        }),
        role: Joi.string().valid('user', 'admin').default('user').optional()
    }).unknown(false),

    loginSchema: () => Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email cannot be empty',
            'string.email': 'Invalid email format'
        }),
        password: Joi.string().min(5)
            .required()
            .messages({
                'string.empty': 'Password cannot be empty',
        }),
    }).unknown(false),
};

module.exports = { userValidation, formatValidationResponse };