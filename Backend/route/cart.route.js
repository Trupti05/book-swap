import express from 'express';
import { addToCart, getCart, removeFromCart, updateQuantity, clearCart} from '../controller/cart.controller.js';
const router = express.Router();

// Route to add a book to the cart
router.post('/add', addToCart);

// Route to get the user's cart
router.get('/:Id', getCart);

// Remove item from cart
router.delete('/remove/:userId/:itemId', removeFromCart);

// Update item quantity in cart
router.put('/update/:userId/:itemId', updateQuantity);

//Clear Cart
router.delete('/clear/:id', clearCart);

export default router;
