const express =require("express");
const { default: mongoose } = require("mongoose");
const dbConnect=require("./config/db")
const userRouter=require("./router/User.router.js");

mongoose.set('strictQuery', true);


let PORT =  process.env.PORT||  8080;

const app=express();
app.use(express.json());
app.use("/users",userRouter)




app.listen(PORT,async()=>{
    await dbConnect();
    console.log(`started at http://localhost:${PORT}`)
})