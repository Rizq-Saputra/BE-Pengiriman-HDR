const Joi = require('joi');

const detailPengirimanItemSchema = Joi.object({
  jumlah_barang: Joi.number().required(),
  detail_pengiriman_id: Joi.number().optional(),
  pengiriman_id: Joi.number().required(),
  barang_id: Joi.number().required()
});

const detailPengirimanSchema = Joi.alternatives().try(
  detailPengirimanItemSchema,
  Joi.array().items(detailPengirimanItemSchema)
);

const validateDetailPengiriman = (req, res, next) => {
  const { error } = detailPengirimanSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateDetailPengiriman };
