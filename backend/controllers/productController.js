const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: 'success', data: products });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({id:req.params.id});
    res.status(200).json({ status: 'success', data: product });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Get products by category
exports.getCategories = async (req, res) => {
    try {
      const categories = await Product.distinct('category'); // Get unique categories
      res.status(200).json({ status: 'success', data: categories });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    }
  };
  // Fetch sub-categories for a specific category
exports.getSubCategories = async (req, res) => {
    try {
      const category = req.params.category;
      const subCategories = await Product.distinct('subCategory', { category }); // Assuming subCategory exists
      res.status(200).json({ status: 'success', data: subCategories });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    }
  };
  
  