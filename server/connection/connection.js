
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config({
  path:"../.env"
})
const ConnectonFunction=async()=>{
await mongoose.connect(process.env.SECRET_CONNECTION)
}

ConnectonFunction().then(()=>{
    console.log("server start hai bhai ")
}).catch(()=>{
    console.log("tumsec na ho payega")
})