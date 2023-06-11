const express = require("express");
const { UserModel } = require("../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth.middleware");
const { blacklist } = require("../blacklist");
require("dotenv").config()
const userRouter = express.Router();
// registeration
userRouter.post("/register", (req, res) => {
   // logic
   const { name, email, pass } = req.body;
   try {
      // saltrounds - how many time password is hashed...

      bcrypt.hash(pass, 5, async (err, hash) => {
         if (err) {
            res.status(400).json({ error: err.message });
         } else {
            const user = new UserModel({ name, email, pass: hash });
            await user.save();
            res.status(200).json({
               msg: "New user has been registered",
               User: req.body,
            });
         }
      });

   } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
   }
});

// authorization
userRouter.post("/login", async (req, res) => {
   // logic
   const { email, pass } = req.body;
   try {
      const user = await UserModel.findOne({ email });
      if (user) {
         // to check the passord that is correct
         bcrypt.compare(pass, user.pass, (err, result) => {
            if (result) {
               // token generation
               // foo : "bar" is random payload
               var token = jwt.sign({ userID : user._id, user:user.name }, process.env.secretKey, {
                  // token will expire in time - just 30 means 30 sec
                  expiresIn: "1h"
               });

               // refresh token with differ secret key as school
               var rtoken = jwt.sign({ foo: "bar" }, "school", {
                  // token will expire in time - just 30 means 30 sec
                  expiresIn: "1d"
               });
               res.status(200).json({ msg: "Login Successfull", token: token,rtoken:rtoken });
            } else {
               res.status(200).json({ msg: "wrong Credentials" });
            }
         });
      } else {
         res.status(200).json({ msg: "User not found" });
      }
   } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
   }
});

// logout
// userRouter.get("/logout", (req, res) => {
//    const token = req.headers.authorization?.split(" ")[1];
//    try {
//       blacklist.push(token);
//       res.status(200).json({ msg: "User has logged out" });
//    } catch (error) {
//       res.status(400).json({ error: error.message });
//    }
// });

module.exports = { userRouter };
