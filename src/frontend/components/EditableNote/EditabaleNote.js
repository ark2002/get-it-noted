import React, { useState, useReducer, useRef } from "react";
import moment from "moment";
import { useAuth, useNotes } from "../../context";
import { noteDetailsReducer } from "../../Reducer";
import { newNoteToDbService } from "../../services";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";

import "./EditableNote.css";
import { useOnClickOutside } from "../../hooks/OnClickOutside";

const EditableNote = () => {
  const ref = useRef();
  const noteInitialState = {
    title: "",
    pinned: false,
    label: "",
    content: "",
    color: "note--color1",
    priority: "LOW",
  };

  const colors = ["color1", "color2", "color3", "color4"];

  const [noteDetails, dispatchNoteDetails] = useReducer(
    noteDetailsReducer,
    noteInitialState
  );
  const { title, pinned, label, content, color, priority } = noteDetails;

  const [list, setList] = useState("");

  const { auth } = useAuth();
  const { setNotes } = useNotes();

  const newNoteAddHandler = async () => {
    const response = await newNoteToDbService(auth.token, {
      ...noteDetails,
      trash: false,
      createdAt: moment(),
    });
    if (response !== undefined) {
      setNotes(response);
      dispatchNoteDetails({ type: "RESET", payload: noteInitialState });
    }
  };

  useOnClickOutside(ref, () => setList(""));

  return (
    <>
      <div className={`edit-note__container flex--column ${color}`}>
        <div className="edit-note__title flex--row">
          <input
            type="text"
            className="edit-title__input primary__font"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              dispatchNoteDetails({ type: "TITLE", payload: e.target.value })
            }
          />
          <div onClick={() => dispatchNoteDetails({ type: "PINNED" })}>
            {pinned ? (
              <span className="material-icons pinned" title="pin">
                push_pin
              </span>
            ) : (
              <span className="material-icons unpinned" title="unpin">
                push_pin
              </span>
            )}
          </div>
        </div>
        <RichTextEditor content={content} setValue={dispatchNoteDetails} />
        <div className="flex--row">
          {label && (
            <div
              className="edit-note__label font__secondary"
              onClick={() =>
                dispatchNoteDetails({ type: "LABEL", payload: "" })
              }
            >
              {label}
            </div>
          )}
          <div className="font__secondary edit-note__priority">{priority}</div>
        </div>
        <div className="edit-note__bottom flex--row">
          <div className="flex--row edit-note__optionpicker" ref={ref}>
            <span
              className="material-icons colorpicker__btn"
              onClick={() => {
                list === "colorpicker" ? setList("") : setList("colorpicker");
              }}
              title="Choose Color"
            >
              palette
            </span>
            {list === "colorpicker" && (
              <div className="color__list flex--row">
                {colors.map((color) => (
                  <div
                    className={color}
                    onClick={() => {
                      setList("");
                      dispatchNoteDetails({
                        type: "COLOR",
                        payload: `note--${color}`,
                      });
                    }}
                  ></div>
                ))}
              </div>
            )}
            <span
              className="material-icons labelpicker__btn"
              onClick={() => {
                list === "label" ? setList("") : setList("label");
              }}
              title="Choose Label"
            >
              label
            </span>
            {list === "label" && (
              <div className="label__list flex--column font__secondary">
                <div
                  onClick={() => {
                    setList("");
                    dispatchNoteDetails({ type: "LABEL", payload: "Label 1" });
                  }}
                >
                  Label 1
                </div>
                <div
                  onClick={() => {
                    setList("");
                    dispatchNoteDetails({ type: "LABEL", payload: "Label 2" });
                  }}
                >
                  Label 2
                </div>
              </div>
            )}
            <span
              className="material-icons labelpicker__btn"
              title="Choose Priority"
              onClick={() => {
                list === "priority" ? setList("") : setList("priority");
              }}
            >
              assignment_late
            </span>
            {list === "priority" && (
              <div className="priority__list flex--column font__secondary">
                <div
                  onClick={() => {
                    setList("");
                    dispatchNoteDetails({ type: "PRIORITY", payload: "HIGH" });
                  }}
                >
                  High
                </div>
                <div
                  onClick={() => {
                    setList("");
                    dispatchNoteDetails({
                      type: "PRIORITY",
                      payload: "MEDIUM",
                    });
                  }}
                >
                  Medium
                </div>
                <div
                  onClick={() => {
                    setList("");
                    dispatchNoteDetails({ type: "PRIORITY", payload: "LOW" });
                  }}
                >
                  Low
                </div>
              </div>
            )}
          </div>
          <button
            className="btn btn-color--primary btn-font--secondary text__small edit-note__add"
            onClick={() => newNoteAddHandler(noteDetails)}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export { EditableNote };
