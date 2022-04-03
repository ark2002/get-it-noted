import React, { useState } from "react";
import { useAuth } from "../../context";
import { updateNoteFromDbService } from "../../services";
import "./BasicNoteCard.css";

const BasicNoteCard = ({ note, setNotes }) => {

    const { title, pinned, label, content, color } = note;

    const [colorlist, setColorlist] = useState(false);
    const [labellist, setLabellist] = useState(false);

    const { auth } = useAuth();

    const pinToggle = async () => {
        const response = await updateNoteFromDbService(auth.token, {
            ...note,
            pinned: !note.pinned
        });
        if (response !== undefined) {
            setNotes(response)
        }
    }

    const colorPicker = async (newColor) => {
        const response = await updateNoteFromDbService(auth.token, {
            ...note,
            color: newColor
        });
        if (response !== undefined) {
            setNotes(response)
        }
    }

    const labelPicker = async (newLabel) => {
        const response = await updateNoteFromDbService(auth.token, {
            ...note,
            label: newLabel
        });
        if (response !== undefined) {
            setNotes(response)
        }
    }

    return (
        <div className={`note__container flex--column ${color}`}>
            <div className="note__content">
                <div className="note__top flex--row">
                    <h1 className="note__title primary__font">{title}</h1>
                    <div onClick={() => pinToggle()}>
                        {pinned ? <span className="material-icons pinned" title="Unpin">push_pin</span> :
                            <span className="material-icons unpinned" title="Pin">push_pin</span>}
                    </div>
                </div>
                <p className="note__copy secondary__font" dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
            {label && <div className="note__label font__secondary" onClick={() => labelPicker("")}>
                {label}
            </div>}
            <div className="flex--row note__optionpicker">
                <span className="material-icons colorpicker__btn" onClick={() => { setLabellist(false); setColorlist(!colorlist) }} title="Change Color">palette</span>
                {colorlist && <div className="color__list flex--row">
                    <div className="color1" onClick={() => colorPicker("note--color1")}></div>
                    <div className="color2" onClick={() => colorPicker("note--color2")}></div>
                    <div className="color3" onClick={() => colorPicker("note--color3")}></div>
                    <div className="color4" onClick={() => colorPicker("note--color4")}></div>
                </div>}
                <span className="material-icons labelpicker__btn" onClick={() => { setLabellist(!labellist); setColorlist(false) }} title="Change Label">label</span>
                {labellist && <div className="label__list flex--column font__secondary">
                    <div onClick={() => labelPicker("Label 1")}>Label 1</div>
                    <div onClick={() => labelPicker("Label 2")}>Label 2</div>
                </div>}
                <span className="material-icons" title="Archive Note">inventory_2</span>
                <span className="material-icons" title="Trash Note">delete</span>
            </div>
        </div>
    );
}

export { BasicNoteCard }