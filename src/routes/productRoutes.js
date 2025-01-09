const express = require('express');
const { validateProduct } = require('../validations/validateProduct');
const { createProduct, updateProduct, getProducts, deleteProduct } = require('../controllers/productController');

const router = express.Router();

// Create Product Route
router.post('/products', validateProduct, createProduct);

// Update Product Route
router.put('/products/:id', validateProduct, updateProduct);

// Get All Products Route
router.get('/products', getProducts);

// Delete Product Route
router.delete('/products/:id', deleteProduct);

module.exports = router;
