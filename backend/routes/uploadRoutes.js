import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

//place to store the images

const storage = multer.diskStorage({
  destination(req, file, cb) {
    //cb refers to the call back
    cb(null, "uploads/"); // here the null refers to the error. As there are no error, we use null. The upload/ is the place were the images needs to be stored.
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!"); //here we pass an error.
  }
}

const upload = multer({
  storage,
});

//creating route
router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: `/${req.file.path}`,
  });
}); // Here, the single refers to the amount of image we want upload. the "image" refer to the file.fieldname. The upload.single("image") is the middleware

export default router;
