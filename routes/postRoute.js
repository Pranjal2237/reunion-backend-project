const express=require("express");
const { userAuthenticate } = require("../middleware/auth");
const { createPost, deletePost } = require("../controllers/postController");

const router=express.Router();

router.post("/posts",userAuthenticate,createPost);

router.delete("/posts/:id",userAuthenticate,deletePost);

module.exports=router;