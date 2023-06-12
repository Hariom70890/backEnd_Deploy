const express = require("express");
const { PostModel } = require("../Model/post.model");

const postRouter = express.Router();

postRouter.post("/add", async (req, res) => {
   try {
      const post = new PostModel(req.body);
      await post.save();
      res.json({ msg: "New Post Has been Added" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

postRouter.get("/", async (req, res) => {
   try {
      const posts = await PostModel.find({ userID: req.body.userID });
      res.json(posts);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

postRouter.patch("/update/:postID", async (req, res) => {
   // userID in the user docs == userID in the note docs
   const userIDinUserDoc = req.body.userID;
   const { postID } = req.params;
   try {
      const post = await PostModel.findOne({ _id: postID });
      const userIDinPostDocs = note.userID;
      if (userIDinUserDoc == userIDinPostDocs) {
         await PostModel.findByIdAndUpdate({ _id: postID }, req.body);
         res.json({ msg: `${post.title} has been updated` });
      } else {
         res.json({ msg: "Not Authorized !!" });
      }
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

postRouter.delete("/delete", async (req, res) => {
   // userID in the user docs == userID in the note docs
   const userIDinUserDoc = req.body.userID;
   const { postID } = req.params;
   console.log(postID)
   try {
      const post = await PostModel.findOne({ _id: postID });
      const userIDinPostDocs = note.userID;
      if (userIDinUserDoc == userIDinPostDocs) {
         await PostModel.findByIdAndDelete({ _id: postID });
         res.json({ msg: `${post.title} has been deleted` });
      } else {
         res.json({ msg: "Not Authorized !!" });
      }
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

module.exports = { postRouter };
