const express = require("express");
const { PostModel } = require("../Model/post.model");
const { auth } = require("../middleware/auth.middleware");

const postRouter = express.Router();
postRouter.use(express.json());
postRouter.post("/add", auth, async (req, res) => {
   // console.log("body",req.body)
   try {
      // const {title,body,device,userID,user} = req.body
      // console.log(user)
      const post = new PostModel(req.body);
      console.log("post", post);
      await post.save();
      res.json({ msg: "New Post Has been Added" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

postRouter.get("/", auth, async (req, res) => {
   const device = req.query.device;
   // console.log(q);
   try {
      const userID = req.body.userID;
      // const x = await PostModel.find({ device });
      // console.log(x);
      if (device) {
         const posts = await PostModel.find({ userID, device });
         res.json(posts);
      } else {
         const posts = await PostModel.find({ userID });
         res.json(posts);
      }
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

postRouter.patch("/update/:postID", auth, async (req, res) => {
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

postRouter.delete("/delete", auth, async (req, res) => {
   // userID in the user docs == userID in the note docs
   const userIDinUserDoc = req.body.userID;
   const { postID } = req.params;
   console.log(postID);
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
