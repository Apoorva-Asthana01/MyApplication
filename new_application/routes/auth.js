const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
//creating a secret key
const SECRET_KEY = "mysecretkey";

//Registering the user
router.post("/register", async(req, res) =>{
    //using object destructuring
    const {username, password, role} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, password:hashedPassword, role});
    await user.save();
    res.status(201).json({message : "User Registered Successfully"});
});

//Loging in the user
router.post("/login", async(req, res) =>{
    //using object destructuring
    const {username, password} = req.body;

    const user = await User.findOne({username});
    if(!user || (await bcrypt.compare(password, user.password))){
        return res.status(401).json({message : "Invalid Credentials"});
    }

    const token = jwt.sign({userId: user._id, rolw: user.role}, SECRET_KEY, {expiresIn:"1h"});
    res.json({token});
});


module.exports = router;