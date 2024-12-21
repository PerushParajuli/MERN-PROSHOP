import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10), //here the hashsync taken in 2 parameters, the first one is the password and the second one is the salt i.e the larger the number the more secure is the password.
    isAdmin: true,
  },
  {
    name: "John",
    email: "john@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Doe",
    email: "doe@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
