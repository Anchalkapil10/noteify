import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();   
//This line of code creates a new instance of an Express router object. 
//The express.Router() function is a constructor that creates and returns a new router object. 
//This object can be used to define routes for an Express application.
                                     
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
//The router object provides methods for defining routes, such as router.get() and router.post(), 
//which take a path and a callback function as arguments. 
//The callback function is called when a request is made to the specified path, and it is responsible for handling the request and sending a response.

export default router;
