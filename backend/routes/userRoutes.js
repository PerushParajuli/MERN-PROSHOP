import express from "express";

const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUsersByID,
  updateUser,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers); // if it is a get request, then we need only the admin to access the request, else if it is a post request, then we need to register the user
router.post("/logout", logoutUser); //as only we are doing logout, we donot need the router.route.
router.post("/auth", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile); // we use protect where we need the authorozation.
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUsersByID)
  .put(protect, admin, updateUser);

export default router;
