// jshint esversion: 6

const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE1: GET all the notes of a logged in user
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const findAllNotes = await Notes.find({ user: req.user.id });
    res.json(findAllNotes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
});

// ROUTE2: add the note using a POST route, login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title cannot be empty.").exists(),
    body("description", "Description must be more than 5 characters.").isLength(
      { min: 3 }
    ),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // check for validity of title, description
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newNote = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await newNote.save();

      res.json(saveNote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!");
    }
  }
);

// ROUTE3: update an existing node, login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    // fetch the title, description and tag from the request made by user
    const { title, description, tag } = req.body;
    const newNote = {};

    // check if the title is available, if not then no need to update it.
    if (title) {
      newNote.title = title;
    }
    // check if the description is available, if not then no need to update it.
    if (description) {
      newNote.description = description;
    }
    // check if the tag is available, if not then no need to update it.
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it.
    // and ensuring that the user who's making changes is the one who's note it is.
    const findNote = await Notes.findById(req.params.id);
    if (!findNote) {
      return res.status(404).send("Request Not Found!");
    }

    if (findNote.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized Access!");
    }

    const findAgain = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send(findAgain);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
});

// ROUTE4: delete an existing node, login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be updated and update it.
    // and ensuring that the user who's making changes is the one who's note it is.
    const findNote = await Notes.findById(req.params.id);
    if (!findNote) {
      return res.status(404).send("Request Not Found!");
    }

    // allow deletion only if user owns this note.
    if (findNote.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized Access!");
    }

    const findAgain = await Notes.findByIdAndDelete(req.params.id);
    res.send("Success: note had been deleted.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
