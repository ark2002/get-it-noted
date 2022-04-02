import React, { useState } from "react";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";

import "./EditableNote.css";

const EditableNote = () => {
    const [colorlist, setColorlist] = useState(false)
    return (
        <>
            <div className="edit-note__container">
                <div className="edit-note__title">
                    <input type="text" className="title__input primary__font" placeholder="Title" />
                </div>
                <RichTextEditor />
                <div className="edit-note__bottom flex--row">
                    <div className="flex--row edit-note__colorpicker">
                        <span class="material-icons colorpicker__btn" onClick={() => setColorlist(!colorlist)}>palette</span>
                        {colorlist && <div className="color__list flex--row">
                            <div className="color1"></div>
                            <div className="color2"></div>
                            <div className="color3"></div>
                            <div className="color4"></div>
                        </div>}
                    </div>
                    <select name="label__list" id="label__list" className="secondary__font label__list" onClick={() => setColorlist(false)}>
                        <option value="No Label">No Label</option>
                        <option value="Label 1">Label 1</option>
                        <option value="Label 2">Label 2</option>
                    </select>
                    <button className="btn btn-color--primary btn-font--secondary text__small edit-note__add">Add</button>
                </div>
            </div>
        </>
    );
}

export { EditableNote }