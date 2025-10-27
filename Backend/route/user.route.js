import express from "express";
import { signup, login,getUserProfile, editUserProfile, addOrder, getUserOrders, organizationSignup} from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/signup/organization", organizationSignup);


//This is the route to fetch user profile data
router.get("/:id", getUserProfile);

//This is the route to edit user profile data
router.put('/:id', editUserProfile);

// New route for adding orders
router.put('/:id/orders', addOrder); 

//get user orders
router.get('/:id/orders', getUserOrders);

export default router;