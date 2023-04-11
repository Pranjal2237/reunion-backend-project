const express=require("express");
const { userAuthenticate } = require("../middleware/auth");
const { createPost, deletePost, likePost, unlikePost } = require("../controllers/postController");

const router=express.Router();

router.post("/posts",userAuthenticate,createPost);

router.delete("/posts/:id",userAuthenticate,deletePost);

router.post("/like/:id",userAuthenticate,likePost);

router.post("/unlike/:id",userAuthenticate,unlikePost);

module.exports=router;