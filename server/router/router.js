const express = require("express");
const router = express.Router();
const User = require("../database/data.js");
const bcrypt = require("bcrypt");





router.get("/", (request, response) => {
  response.send("home page router wala");
  
});

router.post("/signup", async (request, response) => {
  const { firstname, lastname, email, password, confirmpassword } =
    request.body;
   let phone=request.body.phone;
   phone=Number(phone);
   console.log(typeof phone)
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !password ||
    !confirmpassword
  ) {
    response.status(400).json("plz filled all the detail");
  } else {
    if (!(email.slice(-10).toLowerCase() === "@gmail.com"||email.slice(-16)==="@jcboseust.ac.in")) {
      response.status(404).json("your email is not correct");
    } else {
      if (
        phone.toString().length !== 10 &&
        !(phone.toString().length === 13 && phone.toString().startsWith("91"))
      ) {
        response.status(408).json("your number is incorrected");
      } else {
        const findEmail = await User.findOne({ email: email });

        if (findEmail) {
          response.status(412).json("your email is already exist");
        } else {
          if (confirmpassword !== password) {
            response
              .status(416)
              .json("your password not match confirm password");
          } else {
            const user = await User({
              firstname,
              lastname,
              email,
              phone,
              password,
              confirmpassword,
            });

            const token = await user.generateToken();
            await user.save();
            console.log(user);
            response.status(200).json("successful register");
          }
        }
      }
    }
  }
});

router.post("/signin", async (request, response) => {
  const password = request.body.password;
  const email = request.body.email;
  if (!password || !email) {
    response.status(400).json("plz filled all the data");
  } else {
    const findEmail = await User.findOne({ email: email });
    if (!findEmail) {
      response.status(404).json("your email is incorrect");
    } else {
      const checkEmailPassword = await bcrypt.compare(
        password,
        findEmail.password
      );
      if (!checkEmailPassword) {
        response.status(408).json("your password incorrect");
      } else {
        const token = await findEmail.generateToken();
        response.cookie("loginCookie",token,{
          httpOnly:true,
          expires:new Date(Date.now()+1500000),
          secure:true,
          sameSite:"none",
          path:"/"
        })
        await findEmail.save();
        response.status(200).json("successful login");
      }
    }
  }
});



module.exports = router;
