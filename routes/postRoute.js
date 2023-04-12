const express=require("express");
const { userAuthenticate } = require("../middleware/auth");
const { createPost, deletePost, likePost, unlikePost, getPost, getAllPosts, postComment } = require("../controllers/postController");

const router=express.Router();

router.post("/posts",userAuthenticate,createPost);

router.delete("/posts/:id",userAuthenticate,deletePost);

router.post("/like/:id",userAuthenticate,likePost);

router.post("/unlike/:id",userAuthenticate,unlikePost);

router.get("/posts/:id",userAuthenticate,getPost);

router.post("/all_posts",userAuthenticate,getAllPosts);

router.post("/comment/:id",userAuthenticate,postComment);

module.exports=router;