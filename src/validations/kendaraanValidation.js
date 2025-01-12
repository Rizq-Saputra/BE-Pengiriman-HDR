const Joi = require('joi');

// Kendaraan validation schema
const kendaraanSchema = Joi.object({
  plat_nomor: Joi.string().required().messages({
    'any.required': 'Plat nomor is required',
  }),
  jenis_kendaraan: Joi.string().required().messages({
    'any.required': 'Jenis kendaraan is required',
  }),
  status_kendaraan: Joi.string().required().messages({
    'any.required': 'Status kendaraan is required',
  }),
});

// Validation middleware for Kendaraan
const validateKendaraan = (req, res, next) => {
  const { error } = kendaraanSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
};

module.exports = { validateKendaraan };
