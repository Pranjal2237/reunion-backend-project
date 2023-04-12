const express=require("express");
const bodyParser=require("body-parser")
const dotenv=require("dotenv")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const helmet=require("helmet")
const morgan=require("morgan")
const mongoose=require("mongoose")

const app=express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cookieParser());
app.use(cors({credentials:true}));

const user=require("./routes/userRoute")
const post=require("./routes/postRoute")

app.use("/api",user);
app.use("/api",post);

const PORT=process.env.PORT||6000

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`server is running at port ${PORT}`)
        })
    }).catch((error)=>{
        console.log(`${error}`)
    })