import express from "express";

const router = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrdersById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrder,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getAllOrder); // if it is a get request, then we need only the admin to access the request, else if it is a post request, then we need to add the order items
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrdersById);
router.route("/:id/pay").put(protect, admin, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
