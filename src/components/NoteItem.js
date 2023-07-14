// jshint esversion: 6

import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import "./home.css";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="noteContainer">
      <h4 style={{ margin: "6px 0px", wordWrap: "break-word" }}>
        {note.title}
      </h4>
      <div
        style={{ margin: "6px 0px", fontSize: "14px", wordWrap: "break-word" }}
      >
        {
          <div>
            {note.description.split("\n").map((element) => (
              <div key={element}>{element}</div>
            ))}
          </div>
        }
      </div>
      <div
        style={{
          color: "rgb(116, 116, 116)",
          margin: "6px 0px",
          fontSize: "14px",
          wordWrap: "break-word",
        }}
      >
        #{note.tag}
      </div>
      <div className="crud-container">
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/material-outlined/48/FFFFFF/trash--v1.png"
          alt="trash--v1"
          className="crud-icons"
          onClick={() => {
            deleteNote(note._id);
          }}
        />
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/create-new.png"
          alt="create-new"
          className="crud-icons"
          onClick={() => {
            updateNote(note);
          }}
        />
      </div>
    </div>
  );
};

export default NoteItem;
