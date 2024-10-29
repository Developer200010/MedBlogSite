const express = require("express");
const app = express();
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require('cors')
const multer = require("multer");
const path = require("path");

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
// routes
const authRoute = require("./routes/authRoute.js")
const userRoute = require("./routes/userRoute.js")
const postRoute = require("./routes/postRoute.js")
const catRoute = require("./routes/categoryRoute.js")

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// using the route
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/post", postRoute)
app.use("/api/categories", catRoute)


if(process.env.NODE_ENV == "production") {
  app.use(
    cors({
      origin: "http://localhost:5000",
      credential: true,
    })
  );
} else {
  app.use(
    cors({
      credential: true,
    })
  );
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/build")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./","frontend","build", "index.html"));
  })
}

// database connection function.
const dbConnect = async () => {
  try {
    if (process.env.NODE_ENV === "local") {
      await mongoose.connect(process.env.LOCAL_URL);
      console.log("local database is connected...");
    } else {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("production database is connected....");
    }
  } catch (error) {
    console.log("database connection fail...." + error);
  }
};
dbConnect();





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});