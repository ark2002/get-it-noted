import React from "react";
import { BasicNoteCard, EditableNote, NotesList, PinnedNotesList } from "../../components";

import "./NotesPage.css"

const NotesPage = () => {
    return (
        <>
            <div className="notespage__container">
                < div className="notespage__section flex--row">
                    <div className="notes__list flex--column">
                        <EditableNote />
                        <NotesList />
                    </div>
                    <PinnedNotesList />
                </div>
            </div>
        </>
    );
}

export { NotesPage };