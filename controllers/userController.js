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
        const option={
            expires:new Date(Date.now()+7*24*60*60*1000),
            httpOnly:true
        }
        res.status(200).cookie("token",token,option).json({token:token});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}


exports.getUser=async(req,res)=>{
    try{
        const {user}=req.params;
        const userCheck=await User.findById(user);
        if(!userCheck)
        {
            return res.status(400).json({success:false,message:"User not found"})
        }
        const {name,followers,following}=userCheck
        res.status(200).json({success:true,name:name,followerNumber:followers.length,followingNumber:following.length});
    }catch(err){
        res.status(404).json({error:err.message});
    }
}


exports.followUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findById(id);
        if(!user)
        {
            return res.status(400).json({success:false,message:"User dose not exist"});
        }
        const checkFollowers=user.followers.filter((item)=>{return item._id.toString()===req.user._id.toString()})
        if(checkFollowers.length>0)
        {
            return res.status(200).json({message:`Already followed the user ${user.name}`})
        }
        else
        {
            user.followers.push(req.user);
            await user.save();
            const loginUser=await User.findById(req.user._id);
            loginUser.following.push(user);
            await loginUser.save();
        res.status(201).json({success:true,message:`successfully Following the user ${user.name}`});
        }
    }catch(err)
    {
        res.status(400).json({error:err.message});
    }
}


exports.unfollowUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findById(id);
        if(!user)
        {
            return res.status(404).json({success:false,message:"User dose not exist"});
        }
        const loginUser=await User.findById(req.user._id);
        const checkFollowing=loginUser.following.filter((item)=>{return item._id.toString()===id.toString()})
        if(checkFollowing==0)
        {
            return res.status(200).json({message:`Currently not following the user ${user.name}`})
        }
        else
        {
            const removeFollowing=loginUser.following.filter((item)=>{return item._id.toString()!==id.toString()})
            loginUser.following=[...removeFollowing];
            await loginUser.save();
            const removeFollower=user.followers.filter((item)=>{return item._id.toString()!==req.user._id.toString()})
            user.followers=[...removeFollower];
            await user.save();
            res.status(201).json({success:true,message:`Successfully unfollowed the user ${user.name}`})
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
}