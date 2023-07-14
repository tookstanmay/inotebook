// jshint esversion: 6

import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

import "./home.css";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [text, setText] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const onChange = (event) => {
    setText({ ...text, [event.target.name]: event.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault();

    if (text.tag === "") {
      addNote(text.title, text.description, "General");
    } else {
      addNote(text.title, text.description, text.tag);
    }
    setText({ title: "", description: "", tag: "" });
  };
  return (
    <div className="margin">
      <form action="" className="addNoteForm">
        <input
          className="addNoteInput"
          type="text"
          name="title"
          id="title"
          placeholder="Title..."
          onChange={onChange}
          spellCheck="false"
          autoComplete="off"
          minLength={3}
          required
          value={text.title}
        />
        <textarea
          className="addNoteTextarea"
          name="description"
          id="description"
          placeholder="Take a note..."
          onChange={onChange}
          spellCheck="false"
          autoComplete="off"
          minLength={3}
          required
          value={text.description}
        ></textarea>
        <input
          className="addNoteInput"
          type="text"
          name="tag"
          id="tag"
          placeholder="#tags here..."
          onChange={onChange}
          spellCheck="false"
          autoComplete="off"
          value={text.tag}
        />
        <button
          disabled={
            text.title.length <= 3 || text.description.length <= 3
              ? true
              : false
          }
          id="add"
          onClick={handleClick}
        >
          +
        </button>
      </form>
    </div>
  );
};

export default AddNote;
