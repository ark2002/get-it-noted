import React, { useState, useReducer } from "react";
import { useAuth, useNotes } from "../../context";
import { noteDetailsReducer } from "../../Reducer";
import { newNoteToDbService } from "../../services";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";

import "./EditableNote.css";

const EditableNote = () => {

    const noteInitialState = {
        title: "",
        pinned: false,
        label: "",
        content: "",
        color: "note--color1",
    }

    const colors = ["color1", "color2", "color3", "color4"];
    const labels = ["Label 1", "Label 2"];

    const [noteDetails, dispatchNoteDetails] = useReducer(noteDetailsReducer, noteInitialState);
    const { title, pinned, label, content, color } = noteDetails;

    const [colorlist, setColorlist] = useState(false);
    const [labellist, setLabellist] = useState(false);

    const { auth } = useAuth();
    const { setNotes } = useNotes();

    const newNoteAddHandler = async () => {
        const response = await newNoteToDbService(auth.token, {
            ...noteDetails,
            trash: false
        });
        if (response !== undefined) {
            setNotes(response);
            dispatchNoteDetails({ type: "RESET", payload: noteInitialState });
        }
    };

    return (
        <>
            <div className={`edit-note__container flex--column ${color}`}>
                <div className="edit-note__title flex--row">
                    <input type="text" className="edit-title__input primary__font" placeholder="Title" value={title} onChange={(e) => dispatchNoteDetails({ type: "TITLE", payload: e.target.value })} />
                    <div onClick={() => dispatchNoteDetails({ type: "PINNED" })}>
                        {pinned ? <span className="material-icons pinned" title="pin">push_pin</span> :
                            <span className="material-icons unpinned" title="unpin">push_pin</span>}
                    </div>
                </div>
                <RichTextEditor content={content} setValue={dispatchNoteDetails} />
                {label && <div className="edit-note__label font__secondary" onClick={() => dispatchNoteDetails({ type: "LABEL", payload: "" })}>
                    {label}
                </div>}
                <div className="edit-note__bottom flex--row">
                    <div className="flex--row edit-note__optionpicker">
                        <span className="material-icons colorpicker__btn" onClick={() => { setLabellist(false); setColorlist(!colorlist) }} title="Choose Color">palette</span>
                        {colorlist && <div className="color__list flex--row">
                            {colors.map((color) => <div className={color} onClick={() => { setColorlist(false); dispatchNoteDetails({ type: "COLOR", payload: `note--${color}` }) }}></div>)}
                        </div>}
                        <span className="material-icons labelpicker__btn" onClick={() => { setLabellist(!labellist); setColorlist(false) }} title="Choose Label">label</span>
                        {labellist && <div className="label__list flex--column font__secondary">
                            <div onClick={() => { setLabellist(false); dispatchNoteDetails({ type: "LABEL", payload: "Label 1" }) }}>Label 1</div>
                            <div onClick={() => { setLabellist(false); dispatchNoteDetails({ type: "LABEL", payload: "Label 2" }) }}>Label 2</div>
                        </div>}
                    </div>
                    <button className="btn btn-color--primary btn-font--secondary text__small edit-note__add" onClick={() => newNoteAddHandler(noteDetails)}>Add</button>
                </div>
            </div>
        </>
    );
}

export { EditableNote }