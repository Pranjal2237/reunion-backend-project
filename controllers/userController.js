const User=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


exports.createUser=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const salt=await bcrypt.genSalt(10);
         securedPassword=await bcrypt.hash(password,salt);
        const user=await User.create({name,email,password:securedPassword});
        res.status(201).json({
            success:true,
            user
        })
    }
    catch(err)
    {
        res.status(500).json({error:err.message});
    }
}

exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user)
        {
            return res.status(400).json({success:false,message:"Invalid email or password"});
        }
        const checkPassword=await bcrypt.compare(password,user.password);
        if(!checkPassword)
        {
            return res.status(400).json({success:false,message:"Invalid email or password"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.status(200).json({token:token});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}