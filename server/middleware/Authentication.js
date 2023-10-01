const dotenv = require("dotenv");
dotenv.config({
  path: "../.env",
});
const jsonwebtoken = require("jsonwebtoken");
const User = require("../Database/database.js");

const Authentication = async (request, response, next) => {
  try {
    const token = await request.cookies.loginCookie;
    console.log(token);
    const verifyToken = await jsonwebtoken.verify(
      token,
      process.env.SECRET_CODE
    );
    console.log(verifyToken);
    const userFound = await User.findOne({ _id: verifyToken._id });
    console.log(userFound);
    if (!userFound) {
      response.status(408).json("user not found");
    }
    request.token = token;
    request.userFound = userFound;
    request.userId = request.userFound._id;
  } catch (error) {
    response.status(404).json("you are niot authenticate");
  }
};

module.exports = Authentication;
