import React from "react";

export const noteDetailsReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "TITLE":
            return { ...state, title: payload };
        case "PINNED":
            return { ...state, pinned: !state.pinned };
        case "LABEL":
            return { ...state, label: payload };
        case "CONTENT":
            return { ...state, content: payload };
        case "COLOR":
            return { ...state, color: payload };
        case "RESET":
            return payload;
        default:
            return state;
    }
}