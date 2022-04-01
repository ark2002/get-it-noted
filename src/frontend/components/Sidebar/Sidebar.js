import React from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css"

const Sidebar = () => {

    const optionSelected = ({ isActive }) => {
        return "sidebar__option" + (isActive ? "--selected" : "") + " flex--row";
    }

    return (
        <>
            <nav className="sidebar__container flex--column primary__font">
                <NavLink to="/notes" className={optionSelected}>
                    <span className="material-icons sidebar__option-icon">sticky_note_2</span>
                    <span className="sidebar__option-text">Notes</span>
                </NavLink>
                <NavLink to="/labels" className={optionSelected}>
                    <span className="material-icons sidebar__option-icon">label</span>
                    <span className="sidebar__option-text">Labels</span>
                </NavLink>
                <NavLink to="/archives" className={optionSelected}>
                    <span className="material-icons sidebar__option-icon">inventory_2</span>
                    <span className="sidebar__option-text">Archive</span>
                </NavLink>
                <NavLink to="/trash" className={optionSelected}>
                    <span className="material-icons sidebar__option-icon">delete</span>
                    <span className="sidebar__option-text">Trash</span>
                </NavLink>
            </nav>
        </>
    );
}

export { Sidebar };