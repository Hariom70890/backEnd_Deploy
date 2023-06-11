const express = require("express");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth.middleware");
const {NoteModel} = require("../model/note.model")

const notesRouter = express.Router();

notesRouter.use(auth)

notesRouter.post("/create", async(req,res)=>{
// logic
console.log(req.body)
try {
    const payload = req.body;
    const note = new NoteModel(payload);
    // console.log(note)
    await note.save();
    res.json({msg:" New note has been added", note:req.body})
} catch (error) {
    console.log("Not saved")
    res.json({error:error.message})
}
})

notesRouter.get("/", async(req,res)=>{
    console.log(req.body)
try {
    const notes = await NoteModel.find({userID:req.body.userID});
    console.log(notes)
    res.json(notes)
} catch (error) {
    res.status(400).json({error:error.message})
}

})

notesRouter.patch("/update/:noteID",async(req,res)=>{
// userID in the user docs == userID in the note docs
const userIDinUserDoc = req.body.userID
const {noteID} = req.params
try {
    const note = await NoteModel.findOne({_id:noteID});
    const userIDinNoteDocs = note.userID
    if(userIDinUserDoc == userIDinNoteDocs){
        await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
        res.json({msg:`${note.title} has been updated`})
    }else{
        res.json({msg:"Not Authorized !!"})
    }
} catch (error) {
    res.status(400).json({error:error.message})
}
})

notesRouter.post("/delete/:noteID", async(req,res)=>{
// logic
// userID in the user docs == userID in the note docs
const userIDinUserDoc = req.body.userID
const {noteID} = req.params
try {
    const note = await NoteModel.findOne({_id:noteID});
    const userIDinNoteDocs = note.userID
    if(userIDinUserDoc == userIDinNoteDocs){
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.json({msg:`${note.title} has been deleted`})
    }else{
        res.json({msg:"Not Authorized !!"})
    }
} catch (error) {
    res.status(400).json({error:error.message})
}
})

module.exports = {
   notesRouter,
};
