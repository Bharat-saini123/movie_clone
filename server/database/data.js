const mongoose = require("mongoose");
const dotenv=require("dotenv");
dotenv.config({
  path:"../.env"
})

const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  otp:{
    type: Number,
  }
});
userSchema.methods.generateToken = async function () {
    const token = await jsonwebtoken.sign(
      { _id: this._id.toString() },
      process.env.SECRET_CODE
    );
    this.tokens = this.tokens.concat({ token: token });
    return token;
  };
userSchema.pre("save",async function(next){
if(this.isModified("password")){
  this.password=await bcrypt.hash(this.password,10);
  this.confirmpassword=await bcrypt.hash(this.confirmpassword,10);
}
next();
})
const User = new mongoose.model("User", userSchema);


module.exports = User;
