import React from "react";
import { useNotes } from "../../context";
import { BasicNoteCard } from "../BasicNoteCard/BasicNoteCard";

const NotesList = () => {

    const { notes, setNotes } = useNotes();
    const normalNotes = notes.filter((note) => !note.pinned && !note.trash);

    return (
        <>
            {normalNotes.map((note) => <BasicNoteCard key={note._id} note={note} setNotes={setNotes} />)}
        </>
    );
}

export { NotesList };