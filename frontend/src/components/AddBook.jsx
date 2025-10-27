import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-hot-toast';

const AddBook = () => {
    const [authUser] = useAuth();
    const [bookData, setBookData] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        title: ''
    });
    const navigate = useNavigate(); // Initialize navigate


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!authUser) {
            toast.error("You need to be logged in to add a book.");
            return;
        }

        try {
            // Adding user ID to book data
            const newBook = { ...bookData, userId: authUser._id };

            // Make API request to add the book
            const response = await axios.post('http://localhost:4001/book', newBook);

            if (response.status === 201) {
                toast.success('Book added successfully!');
                setBookData({
                    name: '',
                    price: '',
                    category: '',
                    image: '',
                    title: ''
                });
                setTimeout(() => {
                    navigate('/account'); // Redirect to the Account page
                }, 800); // Redirect after a short delay to show the success message
            }
        } catch (error) {
            toast.error('Failed to add book.');
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24 bg-white text-black"> {/* Added pt-24 to push content below navbar */}
            <h2 className="text-2xl font-bold mb-6">Add New Book</h2>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Book Name</label>
                    <input
                        type="text"
                        name="name"
                        value={bookData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 bg-white dark:text-gray-300 font-bold mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={bookData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={bookData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={bookData.image}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={bookData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddBook;
