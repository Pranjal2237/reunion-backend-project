const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

exports.userAuthenticate=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token)
    {
        return res.status(400).json({success:false,message:"please Login again"});
    }
    const varifyToken=jwt.verify(token,process.env.JWT_SECRET);

    req.user=await User.findById(varifyToken.id);

    next();
}