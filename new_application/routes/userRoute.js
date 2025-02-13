const express = require("express");
const {authenticate, authorize} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/admin", authenticate, authorize(["admin"]), (req,res) =>{
    res.json({message : "Admin Dashboard - Access Granted"});
});

router.get("/user", authenticate, authorize(["user" ,"admin"]), (req,res) =>{
    res.json({message : "User Dashboard - Access Granted"});
});


module.exports = router;