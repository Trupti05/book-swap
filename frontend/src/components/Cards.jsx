import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
import toast from "react-hot-toast";
import { apiEndpoints } from "../api/apiEnpoints";

function Cards({ item }) {
  const [authUser] = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async (type) => {
    if (!authUser) {
      toast.error("You need to log in to add books to the cart.");
      return;
    }

    try {
      // console.log("User ID:", authUser._id);
      const response = await axios.post(apiEndpoints.ADD_TO_CART, {
        userId: authUser._id,
        bookId: item._id,
        type,
        price: item.price,
      });
      toast.success(response.data.message);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding book to cart:', error);
      toast.error('Failed to add book to cart.');
    }
  };

  const handleCardClick = () => {
    console.log("Book ID:", item._id);
    navigate(`/book/${item._id}`);
  };
  
  return (
    <div className="mt-4 my-3 p-3 flex justify-center">
      <div
        className="card w-full max-w-xs bg-white text-black shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border cursor-pointer transition-transform transform-gpu"
        onClick={handleCardClick}
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
                onClick={(e) => { e.stopPropagation(); handleAddToCart('buy'); }}
                className="bg-pink-500 text-white font-medium px-3 py-1 rounded-full hover:bg-pink-600 transition-colors duration-200"
              >
                Buy Now
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleAddToCart('rent'); }}
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
