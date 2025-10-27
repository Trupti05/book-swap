import Cart from "../model/cart.model.js";

// Add a book to cart
export const addToCart = async (req, res) => {
    const { userId, bookId, type, price } = req.body;

    try {
        // Find the cart for the user or create a new one
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if the same book with the same type already exists in the cart
        const existingItem = cart.items.find(item => 
            item.book.toString() === bookId && item.type === type
        );

        if (existingItem) {
            // If the same book with the same type exists, increase the quantity
            existingItem.quantity += 1;
        } else {
            // If the book with the specified type doesn't exist, add it to the cart
            cart.items.push({ book: bookId, type, price, quantity: 1 });
        }

        await cart.save();
        res.status(200).json({ message: 'Book added to cart successfully.' });
    } catch (error) {
        console.log("Error adding book to cart: ", error);
        res.status(500).json({ message: 'Error adding book to cart.', error: error.message });
    }
};


// Get the user's cart
export const getCart = async (req, res) => {
    const { Id } = req.params; // Change this if you modify the route parameter

    try {
        const cart = await Cart.findOne({ user: Id }).populate('items.book'); // Use 'user' instead of 'userId'
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.log("Error fetching cart data: ", error);
        res.status(500).json({ message: 'Error fetching cart data.' });
    }
};


// Remove item from cart
export const removeFromCart = async (req, res) => {
    const { userId, itemId } = req.params;

    try {
      // Your logic to remove item from the user's cart
    await Cart.updateOne({ user: userId }, { $pull: { items: { _id: itemId } } });
    res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
    res.status(500).json({ message: 'Error removing item', error });
    }
};


  // Update item quantity in cart
export const updateQuantity = async (req, res) => {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;


    try {
        // Update the item's quantity in the cart
        const result = await Cart.updateOne(
            { user: userId, 'items._id': itemId },
            { $set: { 'items.$.quantity': quantity } }
        );
        
        res.status(200).json({ message: 'Item quantity updated' });
    } catch (error) {
        console.log("Error updating quantity: ", error);
        res.status(500).json({ message: 'Error updating quantity', error });
    }
};


// Clear the user's cart
export const clearCart = async (req, res) => {
    const userId = req.params.id; // Get user ID from request params
    try {
        // Find the user's cart and update its items to an empty array
        const updatedCart = await Cart.findOneAndUpdate(
            { userId }, // Find the cart by userId
            { items: [] }, // Set items to an empty array
            { new: true } // Return the updated cart
        );

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({
            message: "Cart cleared successfully",
            cart: updatedCart,
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
