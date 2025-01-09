const Joi = require('joi');

// Login validation schema for Supir
const loginSupirSchema = Joi.object({
    no_telepon: Joi.string().required().messages({
        'any.required': 'Nomor telepon wajib diisi',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password wajib diisi',
    }),
});

// Validation middleware for Supir login
const validateSupirLogin = (req, res, next) => {
    const { error } = loginSupirSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ errors: error.details });
    }
    next();
};

module.exports = { validateSupirLogin };