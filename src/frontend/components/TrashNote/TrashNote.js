import React from "react";
import { useAuth } from "../../context";
import { deleteNoteFromDbService, updateNoteFromDbService } from "../../services";

import "./TrashNote.css"

const TrashNote = ({ note, setNotes }) => {

    const { _id, title, label, content, color } = note;

    const { auth } = useAuth();

    const restoreHandler = async () => {
        const response = await updateNoteFromDbService(auth.token, {
            ...note,
            trash: !note.trash
        });
        if (response !== undefined) {
            setNotes(response)
        }
    }

    const deleteHandler = async (id) => {
        const response = await deleteNoteFromDbService(auth.token, id);
        if (response !== undefined) {
            setNotes(response);
        }
    };

    return (
        <div className={`note__container flex--column ${color}`}>
            <div className="note__content">
                <div className="note__top flex--row">
                    <h1 className="note__title primary__font">{title}</h1>
                </div>
                <p className="note__copy secondary__font" dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
            {label && <div className="note__label font__secondary">
                {label}
            </div>}
            <div className="flex--row note__optionpicker">
                <span className="material-icons" title="Restore Note" onClick={() => restoreHandler()}>restore_from_trash</span>
                <span className="material-icons" title="Delete Note" onClick={() => deleteHandler(_id)}>delete_forever</span>
            </div>
        </div>
    );
}

export { TrashNote }