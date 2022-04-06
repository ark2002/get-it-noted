import React from "react";
import { TrashNote } from "../../components";
import { useNotes } from "../../context";
import "./TrashPage.css"

const TrashPage = () => {

    const { notes, setNotes } = useNotes();

    const trashedNotes = notes.filter((note) => note.trash);

    return (
        <div className="trash__page">
            {trashedNotes.length > 0 ? <div className="trashed-list flex--column">
                <h1 className="primary__font trashed-list__title">Trash Notes</h1>
                {trashedNotes.map((note) => <TrashNote key={note._id} note={note} setNotes={setNotes} />)}
            </div>:<div>
            <h1 className="primary__font pinned-list__title">Trashed Notes Will Be Visible Here</h1>
                </div>}
        </div>
    );
}

export { TrashPage };