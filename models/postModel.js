const mongoose=require("mongoose");

const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Enter the title of the post"]
    },
    description:{
        type:String,
        required:[true,"Enter the description of the post"]
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:[true,"Enter the user of the post"]
    },
    likes:{
        type:Map,
        of:Boolean
    },
    unlikes:{
        type:Map,
        of:Boolean
    },
    comments:[
        {
            user_id:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            userName:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("Post",PostSchema);