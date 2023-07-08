// jshint esversion: 6

import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // get all notes
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNTk4NTFiZGQwMWViMTgxNTI3NjAxIn0sImlhdCI6MTY4ODU3NDE2M30.TK4KVW8jYaL2sqJDL6xM32i-ue2nDuP5VZywP0wMmQE",
      },
    });
    const json = await response.json();

    console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNTk4NTFiZGQwMWViMTgxNTI3NjAxIn0sImlhdCI6MTY4ODU3NDE2M30.TK4KVW8jYaL2sqJDL6xM32i-ue2nDuP5VZywP0wMmQE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    console.log(json);
    const note = {
      _id: json._id,
      user: json.user,
      title: title,
      description: description,
      tag: tag,
    };

    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNTk4NTFiZGQwMWViMTgxNTI3NjAxIn0sImlhdCI6MTY4ODU3NDE2M30.TK4KVW8jYaL2sqJDL6xM32i-ue2nDuP5VZywP0wMmQE",
      },
    });

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {
    // logic to edit in client
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNTk4NTFiZGQwMWViMTgxNTI3NjAxIn0sImlhdCI6MTY4ODU3NDE2M30.TK4KVW8jYaL2sqJDL6xM32i-ue2nDuP5VZywP0wMmQE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    notes.forEach((note) => {
      if (note._id === id) {
        if (title) {
          note.title = title;
        }
        if (description) {
          note.description = description;
        }
        if (tag) {
          note.tag = tag;
        }
      }
    });
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
