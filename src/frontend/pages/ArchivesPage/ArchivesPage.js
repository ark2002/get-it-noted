import React from "react";
import { ArchiveNote } from "../../components"
import { useArchives } from "../../context"
import "./ArchivesPage.css"

const ArchivesPage = () => {

    const { archives, setArchives } = useArchives()
    return (
        <div className="archive__page">
        {archives.length > 0 ? <div className="archive-list flex--column">
                <h1 className="primary__font archive-list__title">Archived Notes</h1>
                {archives.map((note) => <ArchiveNote key={note._id} note={note} setArchives={setArchives} />)}
            </div>:<div>
            <h1 className="primary__font pinned-list__title">Archived Notes Will Be Visible Here</h1>
                </div>}
        </div>
    );
}

export { ArchivesPage }