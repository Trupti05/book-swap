import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { fullname, email, password, address, number } = req.body; // Added address and number
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
            address: address,  // Added address field
            number: number     // Added number field
        });
        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                address: createdUser.address,   // Included address in response
                number: createdUser.number      // Included number in response
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const organizationSignup = async (req, res) => {
    try {
        const { fullname, email, password, address, number } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
            address: address,
            number: number,
            role: 'organization' // Set role as organization
        });
        await createdUser.save();
        res.status(201).json({
            message: "Organization created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                address: createdUser.address,
                number: createdUser.number,
                role: createdUser.role // Include role in response
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    address: user.address,    // Return address
                    number: user.number       // Return number
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({
                message: "User profile fetched successfully",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    address: user.address,   // Include address
                    number: user.number      // Include number
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const editUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const { fullname, email, address, number } = req.body; // Get fields from request body

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields
        user.fullname = fullname || user.fullname; // Update fullname if provided
        user.email = email || user.email; // Update email if provided
        user.address = address || user.address; // Update address if provided
        user.number = number || user.number; // Update number if provided

        // Save updated user data
        await user.save();

        res.status(200).json({
            message: "User profile updated successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                address: user.address,
                number: user.number,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

//Add orders to the user profile
export const addOrder = async (req, res) => {
    try {
        const userId = req.params.id;
        const { order } = req.body;

        console.log("Order details received:", order); // Log the order details

        // Find the user and push the new order
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { orders: order } }, // Push the new order
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Order added successfully",
            orders: user.orders,
        });
    } catch (error) {
        console.log("Error while adding order:", error.message); // Log error message
        res.status(500).json({ message: "Internal server error" });
    }
};


//Get user orders
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.id; // Get the user ID from the request parameters

        // Fetch orders for the specified user from the database
        const user = await User.findById(userId).populate('orders.items'); // Ensure orders are populated

        if (!user || !user.orders.length) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json(user.orders); // Send the orders as a response
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};
