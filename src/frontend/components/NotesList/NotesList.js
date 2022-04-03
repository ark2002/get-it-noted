import React from "react";
import { useNotes } from "../../context";
import { BasicNoteCard } from "../BasicNoteCard/BasicNoteCard";

const NotesList = () => {

    const { notes, setNotes } = useNotes();

    const pinnedNotes = notes.filter((note) => note.pinned);
    const normalNotes = notes.filter((note) => !note.pinned);

    return (
        <>
            {pinnedNotes.map((note) => <BasicNoteCard key={note._id} note={note} setNotes={setNotes} />)}
            {normalNotes.map((note) => <BasicNoteCard key={note._id} note={note} setNotes={setNotes} />)}
        </>
    );
}

export { NotesList };