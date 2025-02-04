const Joi = require("joi");

// Pelanggan validation schema
const pelangganSchema = Joi.object({
  nama_pelanggan: Joi.string().required().messages({
    "any.required": "Nama pelanggan harus diisi",
  }),
  no_telepon: Joi.string().required().messages({
    "any.required": "No telepon harus diisi",
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
