import jwt from "jsonwebtoken";
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  }); //the sign creates the token takes few arguments 1. the object with the payload, 2. we donot want to share the secret. So we are storing it in the environment variable. 3. is the number of days or minutes the password should be valid. Generally kept one day

  //set JWT as HTTP_Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // secure means https. SO it will be true when it is in production
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days. At what time it should expire.
  });
};

export default generateToken;
