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
        const post=await Post.create({title:title,description:description,userId:req.user._id,likes:{},unlikes:{}})
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


exports.likePost=async(req,res)=>{
    try{
        const {id}=req.params;
        const post=await Post.findById(id);
        if(!post)
        {
            return res.status(400).json({success:false,message:"Post dose not found"})
        }
        if((post?.likes?.size>0&&post?.likes?.has((req.user._id).toString()))||(post?.unlikes?.size>0&&post?.unlikes?.has(req.user._id).toString()))
        {
        const isLiked=post.likes.get((req.user._id).toString());
        if(isLiked)
        {
            return res.status(200).json({message:`Already liked the post by the user ${req.user.name}`});
        }
        const isUnliked=post.unlikes.get((req.user._id).toString());
        if(isUnliked)
        {
            post.unlikes.delete((req.user._id).toString());
        }
        post.likes.set((req.user._id).toString(),true);
        await post.save();
        return res.status(201).json({success:true,message:`${req.user.name} likes the post`})
    }
    else
    {
        post.likes.set((req.user._id).toString(),true)
        await post.save();
        return res.status(201).json({success:true,message:`${req.user.name} likes the post`})
    }
    }catch(err)
    {
        res.status(404).json({error:err.message})
    }
}


exports.unlikePost=async(req,res)=>{
    try{
        const {id}=req.params;
        const post= await Post.findById(id);
        if(!post)
        {
            return res.status(400).json({success:false,message:"Post dose not exist"});
        }
        if((post?.likes?.size>0&&post?.likes?.has((req.user._id).toString()))||(post?.unlikes?.size>0&&post?.unlikes?.has(req.user._id).toString()))
        {
            const isUnliked=post?.unlikes?.get((req.user._id).toString());
            if(isUnliked)
            {
                return res.status(200).json({message:`Already disliked by the user ${req.user.name}`})
            }
            const isLiked=post?.likes?.get((req.user._id).toString());
            if(isLiked)
            {
                post?.likes?.delete((req.user._id).toString());
            }
            post?.unlikes?.set((req.user._id).toString(),true);
            await post.save();
            return res.status(201).json({success:true,message:`${req.user.name} dislikes the post`})
        }
        else
        {
            post?.unlikes?.set((req.user._id).toString(),true);
            await post.save();
            return res.status(201).json({success:true,message:`${req.user.name} dislikes the post`})
        }
    }catch(err){
        res.status(404).json({error:err.message});
    }
}