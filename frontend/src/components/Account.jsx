import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import profilePicture from './profile-picture.png'; // Keep this for the profile picture
import { useAuth } from '../context/AuthProvider';
import Cards from './Cards'; // Import the Cards component

const Account = () => {
    const [authUser] = useAuth();
    const [userData, setUserData] = useState(null);
    const [booksOwned, setBooksOwned] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        fullname: '',
        email: '',
        address: '',
        number: '',
    });

    useEffect(() => {
        if (authUser) {
            // Fetch user profile data
            axios.get(`http://localhost:4001/user/${authUser._id}`)
                .then(response => {
                    setUserData(response.data.user);
                    setEditFormData(response.data.user); // Set form with fetched data
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });

            // Fetch all books and filter by user ID
            axios.get(`http://localhost:4001/book`)
                .then(response => {
                    const books = response.data.filter(book => book.user === authUser._id);
                    setBooksOwned(books);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching books:", error);
                    setError("Failed to load books.");
                    setLoading(false);
                });
        }
    }, [authUser]);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Update profile data in the backend
        axios.put(`http://localhost:4001/user/${authUser._id}`, editFormData)
            .then(response => {
                setUserData(response.data.user); // Update local state with new data
                setIsEditing(false); // Close the form after successful update
                window.location.reload(); // Refresh the page
            })
            .catch(error => {
                console.error("Error updating profile:", error);
            });
    };

    if (!authUser) {
        return <div>You need to log in to view this page.</div>;
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 flex flex-col items-center">
                {/* Profile Section */}
                <div className="w-full mb-6 flex flex-col md:flex-row p-6">
                    {/* Profile Picture and Edit Button */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center md:w-1/3">
                        <img
                            src={profilePicture}
                            alt="User"
                            className="rounded-full w-36 h-36 mb-4"
                        />
                        <h4 className="text-lg font-semibold dark:text-white">
                            {userData?.fullname || 'Loading...'}
                        </h4>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={handleEditProfile}
                        >
                            Edit Profile
                        </button>
                    </div>

                    {/* Profile Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 p-6 md:w-full md:ml-4">
                        {!isEditing ? (
                            <>
                                <h5 className="text-lg font-semibold mb-4 dark:text-white text-center">Profile Information</h5>
                                <div className="mb-4">
                                    <h6 className="text-sm font-medium dark:text-gray-300">Full Name</h6>
                                    <p className="text-gray-600 dark:text-gray-400">{userData?.fullname || 'Loading...'}</p>
                                </div>
                                <hr className="dark:border-gray-600" />
                                <div className="mb-4">
                                    <h6 className="text-sm font-medium dark:text-gray-300">Email</h6>
                                    <p className="text-gray-600 dark:text-gray-400">{userData?.email || 'No email available'}</p>
                                </div>
                                <hr className="dark:border-gray-600" />
                                <div className="mb-4">
                                    <h6 className="text-sm font-medium dark:text-gray-300">Address</h6>
                                    <p className="text-gray-600 dark:text-gray-400">{userData?.address || 'No address available'}</p>
                                </div>
                                <hr className="dark:border-gray-600" />
                                <div className="mb-4">
                                    <h6 className="text-sm font-medium dark:text-gray-300">Mobile Number</h6>
                                    <p className="text-gray-600 dark:text-gray-400">{userData?.number || 'No mobile number available'}</p>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <h5 className="text-lg font-semibold mb-4 dark:text-white text-center">Edit Profile</h5>
                                <div className="mb-4">
                                    <label className="text-sm font-medium dark:text-gray-300">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={editFormData.fullname}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="text-sm font-medium dark:text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editFormData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="text-sm font-medium dark:text-gray-300">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={editFormData.address}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="text-sm font-medium dark:text-gray-300">Mobile Number</label>
                                    <input
                                        type="text"
                                        name="number"
                                        value={editFormData.number}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Button Section */}
                <div className="w-full mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 p-6">
                        <h5 className="text-lg font-semibold mb-4 dark:text-white text-center">Actions</h5>
                        <div className="flex justify-around">
                            <Link to="/cart">
                                <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
                                    View Cart
                                </button>
                            </Link>
                            <Link to="/add-book">
                                <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
                                    Add Book
                                </button>
                            </Link>
                            <Link to="/orders">
                                <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
                                    My Orders
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Books Owned Section Using Cards Component */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6 w-full ">
                    <h5 className="text-lg font-semibold mb-4 dark:text-white text-center">Books Owned</h5>
                    <div className="flex flex-wrap justify-center">
                        {booksOwned.length > 0 ? (
                            booksOwned.map((book) => (
                                <div key={book._id} className="w-full md:w-1/3 px-4 mb-4 flex justify-center">
                                    <Cards item={book} /> {/* Use the Cards component */}
                                </div>
                            ))
                        ) : (
                            <div>No books owned.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
