const Joi = require('joi');

// Register validation schema
const registerSchema = Joi.object({
  username: Joi.string().alphanum().required().messages({
    'string.alphanum': 'Username hanya boleh berisi karakter alfanumerik',
    'any.required': 'Username wajib diisi',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password harus memiliki setidaknya 6 karakter',
    'any.required': 'Password wajib diisi',
  }),
});

// Login validation schema
const loginSchema = Joi.object({
  username: Joi.string().alphanum().required().messages({
    'string.alphanum': 'Username hanya boleh berisi karakter alfanumerik',
    'any.required': 'Username wajib diisi',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password wajib diisi',
  }),
});

// Validation middleware for register
const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
};

// Validation middleware for login
const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
};

module.exports = { validateRegister, validateLogin };
