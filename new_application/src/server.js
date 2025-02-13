const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//connecting to Database i.e MongoDB
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser : true, useUnifiedTopology : true}) 
.then(() => {
    console.log("Database Connected Successfully")
})
.catch((err) => {
    console.log(err);
})

//importing routes
const authRoutes = require("../routes/auth");
app.use("/api/auth", authRoutes);

const userRoutes = require("../routes/userRoute");
app.use("/api/user", userRoutes);

app.listen(5000, () =>{
    console.log("Server is running port 5000");
})

