const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        min:2,
        max:50,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already present"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        min:[12,"Password must be larger than 8 characters"]
    },
    friends:{
        type:Array,
        default:[]
    }
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema);