const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const supirSchema = Joi.object({
  nama_supir: Joi.string().required().messages({
    'any.required': 'Nama supir is required',
  }),
  no_telepon: Joi.string()
    .required()
    .external(async (value) => {
      const existingSupir = await prisma.supir.findUnique({
        where: { no_telepon: value }
      });
      if (existingSupir) {
        throw new Error('Nomor telepon sudah terdaftar');
      }
      return value;
    })
    .messages({
      'any.required': 'No telepon is required',
    }),
  jumlah_antaran: Joi.number().required().messages({
    'any.required': 'Jumlah antaran is required',
    'number.base': 'Jumlah antaran must be a number',
  }),
  status_supir: Joi.string().optional().messages({
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

const supirUpdateSchema = Joi.object({
  nama_supir: Joi.string().optional(),
  no_telepon: Joi.string()
    .optional()
    .external(async (value, helpers) => {
      if (!value) return value;
      const existingSupir = await prisma.supir.findUnique({
        where: { no_telepon: value }
      });
      if (existingSupir && existingSupir.supir_id !== parseInt(helpers.prefs.context.id)) {
        throw new Error('Nomor telepon sudah terdaftar');
      }
      return value;
    }),
  jumlah_antaran: Joi.number().optional(),
  status_supir: Joi.string().optional(),
  password: Joi.string().optional(),
});

// Validation middleware for Supir
const validateSupir = async (req, res, next) => {
  try {
    await supirSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ errors: error.details || [{ message: error.message }] });
  }
};

// Add new validation middleware for updates
const validateSupirUpdate = async (req, res, next) => {
  try {
    await supirUpdateSchema.validateAsync(req.body, { 
      abortEarly: false,
      context: { id: req.params.id } // Pass the ID for no_telepon unique validation
    });
    next();
  } catch (error) {
    return res.status(400).json({ errors: error.details || [{ message: error.message }] });
  }
};

module.exports = { validateSupir, validateSupirUpdate };
