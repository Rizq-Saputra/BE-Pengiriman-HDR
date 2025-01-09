// pengirimanValidation.js
const Joi = require('joi');

// Schema validation using Joi
const pengirimanSchema = Joi.object({
  tanggal_pengiriman: Joi.date().required(),
  status_pengiriman: Joi.string().required(),
  alamat_tujuan: Joi.string().required(),
  deskripsi: Joi.string().optional(),
  ongkir: Joi.number().required(),
  total: Joi.number().required(),
  pembayaran: Joi.string().required(),
  kendaraan_id: Joi.number().integer().required(),
  supir_id: Joi.number().integer().required(),
  pelanggan_id: Joi.number().integer().required(),
});

// Validation middleware for Pengiriman
const validatePengiriman = (req, res, next) => {
  const { error } = pengirimanSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateUpdatePengiriman = (req, res, next) => {
  // update via patch
  const pengirimanUpdateSchema = Joi.object({
    tanggal_pengiriman: Joi.date().optional(),
    status_pengiriman: Joi.string().optional(),
    alamat_tujuan: Joi.string().optional(),
    deskripsi: Joi.string().optional(),
    ongkir: Joi.number().optional(),
    total: Joi.number().optional(),
    pembayaran: Joi.string().optional(),
    kendaraan_id: Joi.number().integer().optional(),
    supir_id: Joi.number().integer().optional(),
    pelanggan_id: Joi.number().integer().optional(),
    bukti_pengiriman: Joi.string().optional(),
  });

  const { error } = pengirimanUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validatePengirimanPelanggan = (req, res, next) => {
  const pengirimanPelangganSchema = Joi.object({
    nomor_telepon: Joi.string().optional(),
    resi: Joi.string().required(),
  });
  const { error } = pengirimanPelangganSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = { validatePengiriman, validatePengirimanPelanggan, validateUpdatePengiriman };
