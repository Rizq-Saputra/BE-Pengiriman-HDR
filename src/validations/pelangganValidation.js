const Joi = require("joi");

// Pelanggan validation schema
const pelangganSchema = Joi.object({
  nama_pelanggan: Joi.string().required().messages({
    "any.required": "Nama pelanggan is required",
  }),
  no_telepon: Joi.string().required().messages({
    "any.required": "No telepon is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be valid",
  }),
});

// Validation middleware for Pelanggan
const validatePelanggan = (req, res, next) => {
  const { error } = pelangganSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
};

module.exports = { validatePelanggan };
