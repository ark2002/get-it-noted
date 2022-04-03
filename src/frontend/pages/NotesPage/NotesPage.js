import React from "react";
import { EditableNote } from "../../components";

import "./NotesPage.css"

const NotesPage = () => {
    return (
        <>
            <div className="notespage__container flex--row">
                <EditableNote />
            </div>
        </>
    );
}

export { NotesPage };