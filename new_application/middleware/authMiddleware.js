const jwt = require("jsonwebtoken");
const SECRET_KEY = "mysecretkey";

const authenticate = (req, res, next) =>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message : "Access Denied"});
    }

    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }catch(error){
        res.status(400).json({message:"Invalid Token"});
    }
};

const authorize = (roles) => (req, res, next) =>{
    if(!roles.includes(req.user.role)){
        return res.status(403).json({message : "Forbidden"});
    }
    next();
};

module.exports = {authenticate, authorize};