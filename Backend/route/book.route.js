import express from "express";
import { getBook, addBook, getBooksByUser,getBookById, searchBooks } from "../controller/book.controller.js";

const router = express.Router();

router.get('/search', searchBooks);
router.get("/", getBook);
router.post("/", addBook); // New route to add a book
router.get('/book/:userId', getBooksByUser);
router.get('/:id', getBookById); // Get a specific book by ID


export default router;