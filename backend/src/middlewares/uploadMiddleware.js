const multer = require("multer");
const path = require("path");

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/")); // Save files in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename for each upload
  },
});

// File filter for only accepting image files
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images of type jpeg, jpg, or png are allowed."));
  }
};

// Initialize Multer with storage and file filter
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // File size limit of 5MB
  fileFilter,
});

module.exports = upload;
