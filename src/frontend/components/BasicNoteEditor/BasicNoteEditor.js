import React from "react";
import ReactQuill from 'react-quill';
import { useRef, useEffect } from "react";

import 'react-quill/dist/quill.snow.css';
import './BasicNoteEditor.css'

export const modules = {
    toolbar: {
        container: "#toolbar2",
    }
};

export const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "code-block"
];


const BasicNoteEditor = ({ content, setValue }) => {

    const inputElement = useRef(null);

    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, []);

    return (
        <>
            <div className="flex--column editor__container">
                <div className="richedi">
                    <div id="toolbar2">
                        <span className="ql-formats">
                            <button className="ql-bold" />
                            <button className="ql-italic" />
                            <button className="ql-underline" />
                            <button className="ql-strike" />
                        </span>
                        <span className="ql-formats">
                            <button className="ql-list" value="ordered" />
                            <button className="ql-list" value="bullet" />
                            <button className="ql-blockquote" />
                            <button className="ql-code-block" />
                        </span>
                        <span className="ql-formats">
                            <button className="ql-link" />
                            <button className="ql-image" />
                            <button className="ql-video" />
                        </span>
                    </div>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={value => setValue({ type: "NEWCONTENT", payload: value })}
                        modules={modules}
                        formats={formats}
                        ref={inputElement}
                    />
                </div>
            </div>
        </>
    );
}

export { BasicNoteEditor };