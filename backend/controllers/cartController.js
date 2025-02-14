const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
    if (!cart) return res.status(200).json({ message: "Cart is empty", cart: [] });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, products: [] });
    } else {
      const existingProduct = cart.products.find(p => p.productId.toString() === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product quantity
exports.updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
 console.log('===============', req.body)
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    console.log('===============2', req.body)
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    console.log('===============3', cart.products)
    const product = cart.products.find(p => p.productId.toString() === productId);
    console.log('===============4', req.body)
    if (!product) return res.status(404).json({ message: "Product not in cart" });
    console.log('===============5', req.body)
    product.quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
