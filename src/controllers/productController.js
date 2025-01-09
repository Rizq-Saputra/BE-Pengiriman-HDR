const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Product
const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, description, price }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};

module.exports = { createProduct, updateProduct, getProducts, deleteProduct };
