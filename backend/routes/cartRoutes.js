const express = require("express");
const { getCart, addToCart, removeFromCart, updateQuantity, clearCart } = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware for authentication

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateQuantity);
router.delete("/remove/:productId", authMiddleware, removeFromCart);
router.delete("/clear", authMiddleware, clearCart);

module.exports = router;
