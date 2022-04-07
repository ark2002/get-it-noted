import React from "react";
import { BasicNoteCard } from "../../components/BasicNoteCard/BasicNoteCard";
import { useNotes } from "../../context";

import "./LabelsPage.css"


const LabelsPage = () => {

    const { notes, setNotes } = useNotes();

    const label1notes = notes.filter((note) => note.label === "Label 1" && note.pinned === true).concat(notes.filter((note) => note.label === "Label 1" && note.pinned === false));
    const label2notes = notes.filter((note) => note.label === "Label 2" && note.pinned === true).concat(notes.filter((note) => note.label === "Label 2" && note.pinned === false));

    return (
        <div className="labels__page">
            {(label2notes.length)||(label1notes.length) > 0 ? <div>
                {label1notes.length > 0 && <div> <h1 className="primary__font trashed-list__title">Label 1 Notes :</h1>
                    {label1notes.map((note) => <BasicNoteCard key={note._id} note={note} setNotes={setNotes} />)} </div>}
                    
                {label2notes.length > 0 && <div><h1 className="primary__font trashed-list__title">Label 2 Notes :</h1>
                    {label2notes.map((note) => <BasicNoteCard key={note._id} note={note} setNotes={setNotes} />)} </div>}
            </div> : <div>
                <h1 className="primary__font pinned-list__title">Labeled Notes Will Be Visible Here</h1>
            </div>
            }
        </div>
    );
}

export { LabelsPage };