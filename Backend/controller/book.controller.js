import Book from "../model/book.model.js";

// Get all books (Optional: you might want to limit this to the current user's books)
export const getBook = async(req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};  

export const searchBooks = async (req, res) => {
    const query = req.query.query;
    console.log("Received query: ", query); // Debug log for the received query

    if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
    }

    try {
        // Log the regex used for searching
        const regex = new RegExp(query, 'i');
        console.log("Using regex for search: ", regex);

        const results = await Book.find({ name: regex });
        console.log("Search results: ", results); // Debug log for search results
        res.json(results);
    } catch (error) {
        console.error("Error fetching search results: ", error); // Log the error
        res.status(500).json({ message: "Internal Server Error", error: error.message }); // Include error message in response
    }
};


// Get books by user ID
export const getBooksByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const books = await Book.find({ userId });
        res.status(200).json(books);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error fetching books" });
    }
};


// Get a single book by ID
export const getBookById = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id); // Fetch the book by its ID
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ message: "Error fetching the book" });
    }
  };

// Add a new book
export const addBook = async (req, res) => {
    const { name, price, category, image, title, userId } = req.body; // Ensure userId is coming from request body

    try {
        const newBook = new Book({
            name,
            price,
            category,
            image,
            title,
            user: userId // Associate the book with the user
        });
        const savedBook = await newBook.save();
        res.status(201).json({ book: savedBook });
    } catch (error) {
        console.log("Error adding book: ", error);
        res.status(500).json({ message: "Error adding book" });
    }
};
