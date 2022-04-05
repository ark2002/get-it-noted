import React from "react";
import { useNotes } from "../../context";
import { BasicNoteCard } from "../BasicNoteCard/BasicNoteCard";
import "./PinnedNotesList.css";

const PinnedNotesList = () => {

    const { notes, setNotes } = useNotes();

    const pinnedNotes = notes.filter((note) => note.pinned && !note.trash);

    return (
        <>
            {pinnedNotes.length > 0 && <div>
                <h1 className="primary__font pinned-list__title">Pinned Notes</h1>
                {pinnedNotes.map((note) => <BasicNoteCard key={note._id} note={note} setNotes={setNotes} />)}
            </div>}
        </>
    );
}

export { PinnedNotesList };