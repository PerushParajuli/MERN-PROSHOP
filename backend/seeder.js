import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "../backend/models/userModel.js";
import Product from "../backend/models/productModel.js";
import Order from "../backend/models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    //first we delete all the data in the collections i.e the models.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //we insert users data into User
    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id; // Here we get the details of the admin

    const sampleProducts = products.map((prod) => {
      return { ...prod, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit(1);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// process.argv is used to get the commands that are run. for example if we run node backend/seeder -hello, we can access -hello by typing process.argv[2]. Similarly, further commands can be accessed by increasing the index number.It starts from the index 2 as 0 and 1 have paths.
//in package.json we write the scripts.
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
