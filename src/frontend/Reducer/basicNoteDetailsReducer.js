import React from "react";

export const basicNoteDetailsReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "COLORLIST":
            return { ...state, colorlist: payload };
        case "LABELLIST":
            return { ...state, labellist: payload };
        case "TITLETOGGLE":
            return { ...state, titleToggle: payload };
        case "CONTENTTOGGLE":
            return { ...state, contentToggle: payload };
        case "NEWTITLE":
            return { ...state, newTitle: payload };
        case "NEWCONTENT":
            return { ...state, newContent: payload };
        default:
            return state;
    }
}