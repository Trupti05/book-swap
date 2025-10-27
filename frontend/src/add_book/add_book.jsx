import React from 'react';
import Navbar from "../components/Navbar";
import addBook from "../components/addBook";
import Footer from "../components/Footer";

function AddBookPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                <addBook />
            </div>
            <Footer />
        </>
    );
}

export default AddBookPage;