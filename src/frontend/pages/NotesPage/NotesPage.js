import React from "react";
import { BasicNoteCard, EditableNote, NotesList } from "../../components";

import "./NotesPage.css"

const NotesPage = () => {
    return (
        <>
            <div className="notespage__container">
                <div className="notes__list flex--column">
                    <EditableNote />
                    <NotesList />
                </div>
            </div>
        </>
    );
}

export { NotesPage };