// jshint esversion: 6

import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import "./modal.css";
import "./home.css";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  // ************** // Modal functions // *************** //
  const [modal, setModal] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const updateNote = (clickedNote) => {
    toggleModal();
    setCurrentNote({
      id: clickedNote._id,
      etitle: clickedNote.title,
      edescription: clickedNote.description,
      etag: clickedNote.tag,
    });
  };

  const onChange = (event) => {
    setCurrentNote({ ...currentNote, [event.target.name]: event.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    editNote(
      currentNote.id,
      currentNote.etitle,
      currentNote.edescription,
      currentNote.etag
    );
    toggleModal();
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <AddNote />
      <div>
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <div className="close-container">
                <h2>Edit Note.</h2>
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/color/48/delete-sign--v1.png"
                  alt="delete-sign--v1"
                  onClick={toggleModal}
                />
              </div>
              <form action="" className="modalForm">
                <input
                  className="modalInput"
                  type="text"
                  name="etitle"
                  id="etitle"
                  placeholder="Title"
                  value={currentNote.etitle}
                  onChange={onChange}
                  spellCheck="false"
                  autoComplete="off"
                  minLength={3}
                  required
                />
                <textarea
                  className="modalTextarea"
                  name="edescription"
                  id="edescription"
                  placeholder="Description"
                  value={currentNote.edescription}
                  onChange={onChange}
                  spellCheck="false"
                  autoComplete="off"
                  minLength={3}
                  required
                ></textarea>
                <input
                  className="modalInput"
                  type="text"
                  name="etag"
                  id="etag"
                  placeholder="Tag"
                  value={currentNote.etag}
                  onChange={onChange}
                  spellCheck="false"
                  autoComplete="off"
                />
                <button id="modalBtn" onClick={handleClick}>
                  Update
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div>
        <div style={{ marginTop: "40px" }}>
          {notes.length === 0 && "Nothing to display. 🙄"}
        </div>
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
