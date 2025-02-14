const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product'); 

// Get wishlist for a user
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
    res.status(200).json(wishlist ? wishlist.products : []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    console.log('==========', req.body)
    const { productId } = req.body;  
    const userId = req.user.id; 

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if wishlist exists for the user
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    // Prevent duplicate products in wishlist
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params; 
    const userId = req.user.id; 

    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      console.log("Before removal:", wishlist.products);
      
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId.toString()
      );
      await wishlist.save();
    }

    
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error });
  }
};
