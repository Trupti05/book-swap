import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiEndpoints } from "../api/apiEnpoints";
import { FaBookReader, FaArrowLeft, FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(apiEndpoints.GET_BOOKS);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-12">
      {/* ✨ Header Section */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-3">
          <FaBookReader className="text-4xl text-pink-500" />
        </div>
        <h1 className="text-2xl md:text-4xl font-semibold">
          We're delighted to have you{" "}
          <span className="text-pink-500">Here! :)</span>
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Here is the list of books you can buy or rent — and you can even post your own!  
          Let’s make reading fun and accessible for everyone. 📚✨
        </p>
        <Link to="/">
          <button className="mt-6 flex items-center justify-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors duration-300 mx-auto">
            <FaArrowLeft /> Back to Home
          </button>
        </Link>
      </motion.div>

      {/* 🪄 Book Grid */}
      <motion.div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {book.length > 0 ? (
          book.map((item) => <Cards key={item._id} item={item} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 mt-12">
            <FaBookOpen className="text-5xl mb-3 text-pink-400" />
            <p className="text-lg">No books available at the moment.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Course;
