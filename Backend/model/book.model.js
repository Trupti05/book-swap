import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    title: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the User model
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
