import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    items: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // Reference to the book
            bookName: { type: String, required: true},
            quantity: { type: Number, required: true },
            type: { type: String, enum: ['buy', 'rent'], required: true } // Order type
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentMode: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'organization'], // Added organization role
        required: true,
        default: 'user' // Default role
    },
    orders: [orderSchema] // Adding orders field
});

const User = mongoose.model("User", userSchema);
export default User;
