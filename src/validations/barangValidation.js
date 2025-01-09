const Joi = require('joi');

// Barang validation schema
const barangSchema = Joi.object({
  nama_barang: Joi.string().required().messages({
    'any.required': 'Nama barang is required',
  }),
  kategori: Joi.string().required().messages({
    'any.required': 'Jenis barang is required',
  }),
  berat: Joi.number().optional().messages({
    'number.base': 'Berat must be a number',
  }),
  harga: Joi.number().required().messages({
    'any.required': 'Harga is required',
    'number.base': 'Harga must be a number',
  }),
});

// Validation middleware for Barang
const validateBarang = (req, res, next) => {
  const { error } = barangSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
};

module.exports = { validateBarang };
