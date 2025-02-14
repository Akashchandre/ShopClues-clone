const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/category', productController.getCategories);
router.get('/:id', productController.getProductById);
router.get('/category/:category/subcategory', productController.getSubCategories);




module.exports = router;