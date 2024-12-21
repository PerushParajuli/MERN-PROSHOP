import express from "express";
import {
  createProductReview,
  createProducts,
  deleteProducts,
  getProducts,
  getProductsById,
  getTopProducts,
  updateProducts,
} from "../controllers/productController.js";
//import products from "../data/products.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProducts);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductsById)
  .put(protect, admin, updateProducts)
  .delete(protect, admin, deleteProducts);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
