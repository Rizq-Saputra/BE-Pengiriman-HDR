const Joi = require('joi');

// Product validation schema
const productSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Product name is required',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Product description is required',
  }),
  price: Joi.number().required().messages({
    'any.required': 'Price is required',
    'number.base': 'Price must be a number',
  }),
});

// Validation middleware for product
const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
};

module.exports = { validateProduct };
