const User=require("../models/userModel");
const Post=require("../models/postModel");

exports.createPost=async(req,res)=>{
    try{
        const{title,description}=req.body;
        const user=await User.findById(req.user._id);
        if(!user)
        {
            return res.status(400).json({success:false,message:"User dose not exist"})
        }
        const post=await Post.create({title:title,description:description,userId:req.user._id,likes:{}})
        res.status(201).json({success:true,post});
    }catch(err){
        res.status(404).json({error:err.message})
    }
}


exports.deletePost=async(req,res)=>{
    try{
        const {id}=req.params;
        const post=await Post.findById(req.params.id);
        if(!post)
        {
            return res.status(400).json({message:"Post is not present"})
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Successfully deleted the post"})
    }catch(err){
        res.status(404).json({error:err.message});
    }
}