const express = require("express");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth.middleware");

const contentRouter = express.Router();

contentRouter.get("/about", (req, res) => {
   //logic
   try {
      res.status(200).json({ msg: "this is the Content About Page" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

contentRouter.get("/movies", auth, (req, res) => {
   try {
      res.status(200).json({ msg: "This is your movies" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

contentRouter.get("/series", auth, (req, res) => {
   try {
      res.status(200).json({ msg: "This is your series" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

module.exports = {
   contentRouter,
};
