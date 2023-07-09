// jshint esversion: 6

import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import "./home.css";
import Modal from "./Modal/Modal";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const [modal, setModal] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const updateNote = (clickedNote) => {
    toggleModal();
    setCurrentNote(clickedNote);
  };
  return (
    <>
      <AddNote />
      <Modal
        modal={modal}
        toggleModal={toggleModal}
        currentNote={currentNote}
      />
      <div>
        <div className="displayNote">
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updateNote={updateNote} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
