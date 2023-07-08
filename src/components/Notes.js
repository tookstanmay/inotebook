// jshint esversion: 6

import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import "./home.css";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddNote />
      <div>
        <div className="displayNote">
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
