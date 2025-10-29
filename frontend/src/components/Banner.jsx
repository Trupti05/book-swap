import React from "react";
import banner from "../../src/assets/Banner.png";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";
function Banner() {
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              One stop for all your reading problems, something new to read{" "}
              <span className="text-pink-500"> everyday!!!</span>
            </h1>
            <p className="text-sm md:text-xl">
            BookSwap is a digital platform that enables seamless book exchanges, 
            promoting sustainability, inclusivity, and community connections through
            user-friendly design, robust security, and personalized recommendations.
            </p>
            {/* Email Input */}
        <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md px-4 py-2 focus-within:ring-2 focus-within:ring-pink-500 transition-all duration-300">
          <FaEnvelope className="text-pink-500 text-lg mr-3" />
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent outline-none flex-grow text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        {/* CTA Button */}
        <a
          href="/Signup"
          className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
        >
          Get Started <FaArrowRight className="text-sm" />
        </a>
          </div>
          {/* <button className="btn mt-6 btn-secondary"> <a href="/Signup"> Get Started</a></button> */}
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
