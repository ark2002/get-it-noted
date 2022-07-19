import React, { useReducer, useRef } from "react";
import { useArchives, useAuth } from "../../context";
import { basicNoteDetailsReducer } from "../../Reducer";
import { updateNoteFromDbService, addArchiveNoteService } from "../../services";
import { BasicNoteEditor } from "../BasicNoteEditor/BasicNoteEditor";
import "./BasicNoteCard.css";
import Moment from "react-moment";
import { useOnClickOutside } from "../../hooks/OnClickOutside";

const BasicNoteCard = ({ note, setNotes }) => {
  const ref = useRef();
  const { setArchives } = useArchives();

  const { _id, title, pinned, label, content, color, priority, createdAt } =
    note;

  const basicNoteState = {
    colorlist: false,
    labellist: false,
    titleToggle: true,
    contentToggle: true,
    prioritylist: false,
    newTitle: title,
    newContent: content,
  };

  const colors = ["color1", "color2", "color3", "color4"];
  const labels = ["Label 1", "Label 2"];
  const priorities = ["HIGH", "MEDIUM", "LOW"];

  const [basicNote, dispatchBasicNote] = useReducer(
    basicNoteDetailsReducer,
    basicNoteState
  );
  const {
    colorlist,
    labellist,
    titleToggle,
    contentToggle,
    prioritylist,
    newTitle,
    newContent,
  } = basicNote;

  useOnClickOutside(ref, () => dispatchBasicNote({ type: "CLOSEALL" }));

  const { auth } = useAuth();

  const titleEdit = async (newTitle) => {
    const response = await updateNoteFromDbService(auth.token, {
      ...note,
      title: newTitle,
    });
    if (response !== undefined) {
      setNotes(response);
    }
  };

  const contentEdit = async (newContent) => {
    const response = await updateNoteFromDbService(auth.token, {
      ...note,
      content: newContent,
    });
    if (response !== undefined) {
      setNotes(response);
    }
  };

  const pinToggle = async () => {
    const response = await updateNoteFromDbService(auth.token, {
      ...note,
      pinned: !note.pinned,
    });
    if (response !== undefined) {
      setNotes(response);
    }
  };

  const colorPicker = async (newColor) => {
    const response = await updateNoteFromDbService(auth.token, {
      ...note,
      color: newColor,
    });
    if (response !== undefined) {
      setNotes(response);
    }
  };

  const labelPicker = async (newLabel) => {
    const response = await updateNoteFromDbService(auth.token, {
      ...note,
      label: newLabel,
    });
    if (response !== undefined) {
      setNotes(response);
    }
  };

  const priorityPicker = async (newPriority) => {
    const response = await updateNoteFromDbService(auth.token, {
      ...note,
      priority: newPriority,
    });
    if (response !== undefined) {
      setNotes(response);
    }
  };

  const trashHandler = async () => {
    const response = await updateNoteFromDbService(auth.token, {
      ...note,
      pinned: false,
      trash: true,
    });
    if (response !== undefined) {
      setNotes(response);
    }
  };

  const archiveHandler = async () => {
    const response = await addArchiveNoteService(auth.token, note);
    if (response !== undefined) {
      setNotes(response.notes);
      setArchives(response.archives);
    }
  };

  const handleContentEditBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      dispatchBasicNote({ type: "CONTENTTOGGLE", payload: true });
    }
  };

  return (
    <div className={`note__container flex--column ${color}`}>
      <div className="note__content">
        <div className="note__top flex--row">
          {titleToggle ? (
            <h1
              className="note__title primary__font"
              onClick={() =>
                dispatchBasicNote({ type: "TITLETOGGLE", payload: false })
              }
            >
              {newTitle}
            </h1>
          ) : (
            <input
              type="text"
              className="title__input primary__font"
              value={newTitle}
              autoFocus
              onBlur={() => {
                dispatchBasicNote({ type: "TITLETOGGLE", payload: true });
                titleEdit(newTitle);
              }}
              onChange={(e) =>
                dispatchBasicNote({ type: "NEWTITLE", payload: e.target.value })
              }
            />
          )}
          <div onClick={() => pinToggle()}>
            {pinned ? (
              <span className="material-icons pinned" title="Unpin">
                push_pin
              </span>
            ) : (
              <span className="material-icons unpinned" title="Pin">
                push_pin
              </span>
            )}
          </div>
        </div>
        <div
          className="flex--column note__copyContainer"
          onBlur={(e) => {
            handleContentEditBlur(e);
            contentEdit(newContent);
          }}
        >
          {contentToggle ? (
            <p
              className="note__copy secondary__font"
              dangerouslySetInnerHTML={{ __html: newContent }}
              onClick={() =>
                dispatchBasicNote({ type: "CONTENTTOGGLE", payload: false })
              }
            ></p>
          ) : (
            <BasicNoteEditor
              content={newContent}
              setValue={dispatchBasicNote}
            />
          )}
        </div>
      </div>
      <div className="flex--row">
        {label && (
          <div
            className="note__label font__secondary"
            onClick={() => labelPicker("")}
          >
            {label}
          </div>
        )}
        <div className="font__secondary edit-note__priority">{priority}</div>
      </div>
      <div className="flex--row note__optionpicker" ref={ref}>
        <span
          className="material-icons colorpicker__btn"
          onClick={() => {
            dispatchBasicNote({ type: "LABELLIST", payload: false });
            dispatchBasicNote({ type: "PRIORITYLIST", payload: false });
            dispatchBasicNote({ type: "COLORLIST", payload: !colorlist });
          }}
          title="Change Color"
        >
          palette
        </span>
        {colorlist && (
          <div className="color__list flex--row">
            {colors.map((color) => (
              <div
                className={color}
                onClick={() => {
                  dispatchBasicNote({ type: "COLORLIST", payload: false });
                  colorPicker(`note--${color}`);
                }}
              ></div>
            ))}
          </div>
        )}
        <span
          className="material-icons labelpicker__btn"
          onClick={() => {
            dispatchBasicNote({ type: "LABELLIST", payload: !labellist });
            dispatchBasicNote({ type: "COLORLIST", payload: false });
            dispatchBasicNote({ type: "PRIORITYLIST", payload: false });
          }}
          title="Change Label"
        >
          label
        </span>
        {labellist && (
          <div className="label__list flex--column font__secondary">
            {labels.map((label) => (
              <div
                onClick={() => {
                  dispatchBasicNote({ type: "LABELLIST", payload: false });
                  labelPicker(label);
                }}
              >
                {label}
              </div>
            ))}
          </div>
        )}
        <span
          className="material-icons labelpicker__btn"
          title="Choose Priority"
          onClick={() => {
            dispatchBasicNote({ type: "PRIORITYLIST", payload: !prioritylist });
            dispatchBasicNote({ type: "COLORLIST", payload: false });
            dispatchBasicNote({ type: "LABELLIST", payload: false });
          }}
        >
          assignment_late
        </span>
        {prioritylist && (
          <div className="priority__list flex--column font__secondary">
            {priorities.map((priority) => (
              <div
                onClick={() => {
                  dispatchBasicNote({ type: "PRIORITYLIST", payload: false });
                  priorityPicker(priority);
                }}
              >
                {priority}
              </div>
            ))}
          </div>
        )}
        <span
          className="material-icons"
          title="Archive Note"
          onClick={() => archiveHandler(_id)}
        >
          inventory_2
        </span>
        <span
          className="material-icons"
          title="Trash Note"
          onClick={() => trashHandler()}
        >
          delete
        </span>
        <div className="note__moment secondary__font">
          <Moment fromNow>{createdAt}</Moment>
        </div>
      </div>
    </div>
  );
};

export { BasicNoteCard };
