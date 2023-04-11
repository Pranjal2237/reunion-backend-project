const express=require("express");
const { createUser, loginUser, getUser, followUser, unfollowUser } = require("../controllers/userController");
const { userAuthenticate } = require("../middleware/auth");

const router=express.Router();

router.post("/ragister",createUser);

router.post("/login",loginUser);

router.get("/:user",userAuthenticate,getUser);

router.post("/follow/:id",userAuthenticate,followUser)

router.post("/unfollow/:id",userAuthenticate,unfollowUser);

module.exports=router;