import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "../backend/routes/productRoutes.js";
import userRoutes from "../backend/routes/userRoutes.js";
import orderRoutes from "../backend/routes/orderRoutes.js";
import uploadRoutes from "../backend/routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT; //set port

connectDB(); //connecting to the database

const app = express(); //initialize express

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //thses are done so that the data in the request are converted to json and are readable.

// Cookie parser middleware
app.use(cookieParser()); //access req.cookies

app.get("/", (req, res) => res.send(`API is running on port : ${port}`));
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

//Make the upload folder static
const __dirname = path.resolve(); //set __dirname to current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port : ${port}`)); //start server
