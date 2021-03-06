import React from "react";
import Moment from "react-moment";
import { useAuth, useNotes } from "../../context";
import { restoreArchivedNoteService, deleteArchivedNote } from "../../services";

import "./ArchiveNote.css"

const ArchiveNote = ({ note, setArchives }) => {

    const { _id, title, label, content, color, priority, createdAt } = note;

    const { auth } = useAuth();
    const { setNotes } = useNotes();

    const restoreHandler = async () => {
        const response = await restoreArchivedNoteService(auth.token, _id);
        if (response !== undefined) {
            setArchives(response.archives);
            setNotes(response.notes);
        }
    };

    const deleteHandler = async () => {
        const response = await deleteArchivedNote(auth.token, _id);
        if (response !== undefined) {
            setArchives(response);
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
            <div className="flex--row">
                {label && <div className="note__label font__secondary">
                    {label}
                </div>}
                <div className="font__secondary edit-note__priority">
                    {priority}
                </div>
            </div>
            <div className="flex--row note__optionpicker">
                <span className="material-icons" title="Restore Note" onClick={() => restoreHandler()}>unarchive</span>
                <span className="material-icons" title="Delete Note" onClick={() => deleteHandler()}>delete_forever</span>
                <div className="note__moment secondary__font">
                    <Moment fromNow>
                        {createdAt}
                    </Moment>
                </div>
            </div>
        </div>
    );
}

export { ArchiveNote }