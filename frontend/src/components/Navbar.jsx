import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import { HiOutlineMoon } from "react-icons/hi";
import { FiSun } from "react-icons/fi";

function Navbar() {
  const [authUser] = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const element = document.documentElement;
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/search-results?query=${searchQuery}`);
  };

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/course">Buy/Rent</a>
      </li>
      <li>
        <a href="/account">Account</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
    </>
  );

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        sticky
          ? "shadow-md bg-white/80 dark:bg-slate-800/90 backdrop-blur-md"
          : "bg-white dark:bg-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="navbar flex justify-between items-center py-3">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <div className="dropdown lg:hidden">
              <button
                tabIndex={0}
                role="button"
                className="btn btn-ghost p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 dark:bg-slate-700 rounded-box w-56 space-y-2"
              >
                {navItems}

                {/* Mobile Search */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="mt-2 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books"
                    className="input input-bordered w-full text-sm dark:bg-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary text-white"
                  >
                    🔍
                  </button>
                </form>

                {/* Theme Toggle (mobile) */}
                <div className="flex justify-start mt-3">
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="btn btn-outline btn-sm"
                  >
                    {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                  </button>
                </div>
              </ul>
            </div>

            <a href="/" className="text-2xl font-bold cursor-pointer">
              BookSwap
            </a>
          </div>

          {/* Middle Nav (Desktop) */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base gap-2">
              {navItems}
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search (Desktop) */}
            <div className="hidden md:block">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center border rounded-md px-3 py-1.5 gap-2"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none w-40 md:w-56 dark:text-white"
                  placeholder="Search books"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70 cursor-pointer"
                  onClick={handleSearchSubmit}
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </form>
            </div>

            {/* Theme Toggle (Desktop) */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:block p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition"
            >
              {theme === "dark" ? <FiSun /> : <HiOutlineMoon /> }
            </button>

            {/* Auth */}
            {authUser ? (
              <Logout />
            ) : (
              <a
                className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </a>
            )}
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
