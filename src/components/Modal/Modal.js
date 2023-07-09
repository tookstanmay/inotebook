// jshint esversion: 6

import React, { useState, useContext } from "react";
import "./modal.css";
import "../home.css";
import noteContext from "../../context/notes/noteContext";

export default function Modal(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const { modal, toggleModal, currentNote, setCurrentNote } = props;
  const [text, setText] = useState({
    etitle: "",
    edescription: "",
    etag: "General",
  });

  const onChange = (event) => {
    setCurrentNote({ ...currentNote, [event.target.name]: event.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    // addNote(text.title, text.description, text.tag);

    document.getElementById("etitle").value = "";
    document.getElementById("edescription").value = "";
    document.getElementById("etag").value = "";
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
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
                value={`${currentNote.title}`}
                onChange={onChange}
                spellCheck="false"
                autoComplete="off"
              />
              <textarea
                className="modalTextarea"
                name="edescription"
                id="edescription"
                value={`${currentNote.description}`}
                onChange={onChange}
                spellCheck="false"
                autoComplete="off"
              ></textarea>
              <input
                className="modalInput"
                type="text"
                name="etag"
                id="etag"
                value={`${currentNote.tag}`}
                onChange={onChange}
                spellCheck="false"
                autoComplete="off"
              />
              <button id="modalBtn">Update</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
