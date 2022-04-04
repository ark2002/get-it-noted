import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useAuth } from "../../context";

import "./Navbar.css"

const Navbar = ({ searchRestrict }) => {
    const [listVisibility, setListVisibility] = useState(false)
    const { auth, setAuth } = useAuth();

    const location = useLocation();

    const signOutHandler = (setAuth) => {
        localStorage.removeItem("AUTH_TOKEN");
        localStorage.removeItem("USERNAME");
        setAuth((auth) => ({
            ...auth,
            status: false,
            token: null,
            userName: "",
        }));
    };
    return (
        <>
            <header className="header flex--row">
                <NavLink to="/">
                    <div className="header__logo-container flex--row">
                        <img src="/assets/Logo.png" alt="logo image" className="logo__img" />
                        <h2 className="header__logo">Get It Noted</h2>
                    </div>
                </NavLink>
                {searchRestrict(location.pathname) && <div className="navbar__search-container flex--row">
                    <input type="text" className="navbar__search input__txt" placeholder="Search" />
                    <button className="navbar__search-btn btn">
                        <span className="material-icons search__btn-icon">search</span>
                    </button>
                </div>}
                <nav className="navbar__nav flex--row">
                    <li onClick={() => setListVisibility(!listVisibility)}>
                        <a className="flex--row nav__account__container"><span className="material-icons account-icon" title="Account">account_circle</span>
                            <span className="font__primary text__small">{auth.userName}</span>▼
                        </a>
                    </li>
                </nav>
            </header>
            {listVisibility && (!auth.status ? <div className="dropdown-list secondary__font text__small">
                <NavLink to="/signin" onClick={() => setListVisibility(!listVisibility)}><li>Sign-In</li></NavLink>
                <NavLink to="/signup" onClick={() => setListVisibility(!listVisibility)}><li>Sign-Up</li></NavLink>
            </div> : <div className="dropdown-list secondary__font text__small">
                <NavLink to="/"><li onClick={() => { signOutHandler(setAuth); setListVisibility(!listVisibility) }}>Log-Out</li></NavLink>
            </div>)}
        </>
    );
}
export { Navbar };