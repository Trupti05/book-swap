import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider'; // Import useAuth
import toast from "react-hot-toast";

function Cards({ item }) {
  const [authUser] = useAuth(); // Get the current authenticated user
  const navigate = useNavigate(); // Get the navigate function

  const handleAddToCart = async (type) => {
    if (!authUser) {
      toast.error("You need to log in to add books to the cart.");
      return;
    }

    try {
      console.log("User ID:", authUser._id); // Check if the user ID is correct
      const response = await axios.post('http://localhost:4001/cart/add', {
        userId: authUser._id, // Use the user ID from authUser
        bookId: item._id,
        type,
        price: item.price,
      });
      toast.success(response.data.message); // Show success message
      navigate('/cart'); // Navigate to the cart page
    } catch (error) {
      console.error('Error adding book to cart:', error);
      toast.error('Failed to add book to cart.');
    }
  };

  const handleCardClick = () => {
    console.log("Book ID:", item._id); // Check the book ID being passed
    navigate(`/book/${item._id}`);
  };
  
  return (
    <div className="mt-4 my-3 p-3 flex justify-center">
      <div
        className="card w-full max-w-xs bg-white text-black shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border cursor-pointer transition-transform transform-gpu"
        onClick={handleCardClick} // Add onClick to handle redirection
      >
        <figure>
          <img src={item.image} alt="Book" className="object-cover h-60 w-full rounded-t-lg" />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-lg font-semibold flex justify-between items-center">
            <span>{item.name}</span>
            <span className="badge badge-secondary ">
            {item.category}</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{item.title}</p>
          <div className="card-actions justify-between mt-4">
            <div className="badge badge-outline text-lg">Rs.{item.price}</div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => { e.stopPropagation(); handleAddToCart('buy'); }} // Stop event propagation to prevent triggering card click
                className="bg-pink-500 text-white font-medium px-3 py-1 rounded-full hover:bg-pink-600 transition-colors duration-200"
              >
                Buy Now
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleAddToCart('rent'); }} // Stop event propagation to prevent triggering card click
                className="bg-pink-500 text-white font-medium px-3 py-1 rounded-full hover:bg-pink-600 transition-colors duration-200"
              >
                Rent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
