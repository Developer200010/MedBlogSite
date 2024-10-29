const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const db = require("./config/dbConnection.js");

// Initialize database connection
db();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "/images")));

// Route imports
const authRoute = require("./routes/authRoute.js");
const userRoute = require("./routes/userRoute.js");
const postRoute = require("./routes/postRoute.js");
const catRoute = require("./routes/categoryRoute.js");

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

// File upload endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// Route setup
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);
app.use("/api/categories", catRoute);

// Static file configuration for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
