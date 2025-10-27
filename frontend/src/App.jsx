import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import AboutPage from "./about/AboutPage";
import Accounts from "./account/Accounts";
import Organization from "./components/Organization"; 
import Login from "./components/Login";
import Signup from "./components/Signup";
import CartPage from "./cart/CartPage"; 
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import AddBookPage from "./add_book/add_book";
import { CartProvider } from './context/CartContext'; 
import BookDetailPage from "./bookdetail/BookDetailPage";
import PaymentPage from "./payment/PaymentPage"; 
import OrderPage from "./order/OrderPage";
import SearchResultPage from "./search/SearchResultPage";
import TermsAndConditions from './components/t&c';

function App() {
  const [authUser] = useAuth();

  return (
    <>
      <CartProvider>
      <div className="min-h-screen bg-white text-black dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/organization" element={<Organization />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/account"
            element={authUser ? <Accounts /> : <Navigate to="/signup" />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/search-results" element={<SearchResultPage />} />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
        <Toaster />
      </div>
      </CartProvider>
    </>
  );
}

export default App;
