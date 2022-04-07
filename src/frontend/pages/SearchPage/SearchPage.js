import React from "react";
import { useFilter, useNotes } from "../../context";
import { BasicNoteCard } from "../../components";
import { notesLabelsFiltered, notesPriorityFiltered, noteTimeSorted } from "../../utils";
import "./SearchPage.css"

const SearchPage = () => {

    const { notes, setNotes } = useNotes();
    const { filters: { labelFilter, priorityFilter, timeSort } } = useFilter();

    const sortedNotes = noteTimeSorted(notes, timeSort);
    const priorityFilteredNotes = notesPriorityFiltered(sortedNotes, priorityFilter);
    const labelFilteredNotes = notesLabelsFiltered(priorityFilteredNotes, labelFilter);

    return (
        <div className="search__page">
            <div className="searched-list flex--column">
                {labelFilteredNotes.map((note) => <BasicNoteCard key={note._id} note={note} setNotes={setNotes} />)}
            </div>
        </div>
    );
}

export { SearchPage };