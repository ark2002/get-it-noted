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
    case "PRIORITYLIST":
      return { ...state, prioritylist: payload };
    case "NEWTITLE":
      return { ...state, newTitle: payload };
    case "NEWCONTENT":
      return { ...state, newContent: payload };
    case "CLOSEALL":
      return {
        ...state,
        colorlist: false,
        labellist: false,
        prioritylist: false,
      };
    default:
      return state;
  }
};
