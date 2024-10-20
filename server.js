const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path")
const db = require("./config/dbConnection.js")
db()
const cors = require('cors')
// routes
const authRoute = require("./routes/authRoute.js")
const userRoute = require("./routes/userRoute.js")
const postRoute = require("./routes/postRoute.js")
const catRoute = require("./routes/categoryRoute.js")

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// using the route
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/post", postRoute)
app.use("/api/categories", catRoute)

if(process.env.NODE_ENV === "local"){
    app.use(cors({
        origin : "http://localhost:5000",
        credentials: true
    }))
}else{
    app.use(cors({
        credentials:true
    }))
}

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "./frontend/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'./','frontend','build','index.html'))
    })

}




app.listen(process.env.PORT,()=>{
    console.log(`server is running fine ${process.env.PORT}`)
})