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
    tag: "General",
  });
  const onChange = (event) => {
    setText({ ...text, [event.target.name]: event.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    addNote(text.title, text.description, text.tag);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("tag").value = "";
  };
  return (
    <div>
      <form action="">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title..."
          onChange={onChange}
        />
        <textarea
          name="description"
          id="description"
          placeholder="Take a note..."
          onChange={onChange}
        ></textarea>
        <input
          type="text"
          name="tag"
          id="tag"
          placeholder="#tags here..."
          onChange={onChange}
        />
        <button id="add" onClick={handleClick}>
          +
        </button>
      </form>
    </div>
  );
};

export default AddNote;
