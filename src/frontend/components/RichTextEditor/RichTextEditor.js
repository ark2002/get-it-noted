import React from "react";
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.css'

export const modules = {
    toolbar: {
        container: "#toolbar",
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


const RichTextEditor = ({ content, setValue }) => {
    return (
        <>
            <div className="flex--column editor__container">
                <div className="richedi">
                    <div id="toolbar">
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
                        </span>
                    </div>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={value => setValue({ type: "CONTENT", payload: value })}
                        placeholder={"Write something awesome..."}
                        modules={modules}
                        formats={formats}
                    />
                </div>
            </div>
        </>
    );
}

export { RichTextEditor };