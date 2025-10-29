import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { apiEndpoints } from "../api/apiEnpoints";
import { FaShoppingCart, FaRupeeSign, FaBookOpen } from "react-icons/fa";

function Cards({ item }) {
  const [authUser] = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async (type) => {
    if (!authUser) {
      toast.error("You need to log in to add books to the cart.");
      return;
    }

    try {
      const response = await axios.post(apiEndpoints.ADD_TO_CART, {
        userId: authUser._id,
        bookId: item._id,
        type,
        price: item.price,
      });
      toast.success(response.data.message);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding book to cart:", error);
      toast.error("Failed to add book to cart.");
    }
  };

  const handleCardClick = () => {
    navigate(`/book/${item._id}`);
  };

  return (
    <div className="my-5 flex justify-center">
      <div
        onClick={handleCardClick}
        className="relative w-full max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-300 border border-gray-100 dark:border-gray-800 cursor-pointer"
      >
        {/* Image Section */}
        <figure className="overflow-hidden rounded-t-2xl">
          <img
            src={item.image}
            alt={item.name}
            className="w-72 h-72 object-cover hover:scale-110 transition-transform duration-500"
          />
        </figure>

        {/* Book Info */}
        <div className="p-6 space-y-3 ">
          <h2 className="flex justify-between items-center font-semibold text-lg md:text-xl">
            <span className="flex items-center gap-2">
              <FaBookOpen className="text-pink-500" /> {item.name}
            </span>
            <span className="bg-pink-100 dark:bg-pink-600/30 text-pink-600 dark:text-pink-400 text-xs px-3 py-1 rounded-full font-medium">
              {item.category}
            </span>
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {item.title}
          </p>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-1 font-semibold text-pink-500">
              <FaRupeeSign className="text-base" /> {item.price}
            </div>

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart("buy");
                }}
                className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-600 transition-colors duration-200"
              >
                <FaShoppingCart className="text-xs" /> Buy
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart("rent");
                }}
                className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-600 transition-colors duration-200"
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
