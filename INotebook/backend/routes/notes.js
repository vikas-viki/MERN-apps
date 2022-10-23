const express = require('express');
const router = express.Router();
const fetchuser = require('../Middlewares/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//  Fetchs all the notes of the specified user id -- auth-token
router.get('/fetch-all-notes', fetchuser, async (req, res) => {
    try {
        // validating and fetching user
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "error": "erroe occured" })
    }

})

// Creates a new note -- (title,description,tag), auth-token
router.post('/addnote', fetchuser, [
    // validating the req
    body('title', 'enter valid title').isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters long").isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "error": "error occured" })
    }
})

// Updates the note of the specified id -- (title,description,tag), auth-token, noteid
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        //  Check what are thing to be updated by user
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        // Finding specified note
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        // Updating specified note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "error": "error occured" })
    }
})

// Deleting the specified note - auth-token, noteid
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Succes": "Your note has been succesfully deleted", note: note.id })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "error": "error occured" })
    }
})
module.exports = router