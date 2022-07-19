import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context";
import { useOnClickOutside } from "../../hooks/OnClickOutside";
import { Filters } from "../Filters/Filters";

import "./Navbar.css";

const Navbar = ({ searchRestrict }) => {
  const [listVisibility, setListVisibility] = useState(false);
  const { auth, setAuth } = useAuth();
  const [filterListVisibility, setFilterListVisiblity] = useState(false);
  const [modal, setModal] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef();

  useOnClickOutside(ref, () => setListVisibility(false));

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

  useEffect(() => {
    if (modal === "filters" && location.pathname === "/search") {
      setFilterListVisiblity(true);
    } else if (modal === "filters" && location.pathname !== "/search") {
      setFilterListVisiblity(false);
      setModal("");
    } else if (modal === "") {
      setFilterListVisiblity(false);
    }
  }, [modal, location]);

  return (
    <div className="header__container">
      <header className="header flex--row">
        <NavLink to="/">
          <div className="header__logo-container flex--row">
            <img
              src="/assets/Logo.jpg"
              alt="logo image"
              className="logo__img"
            />
            <h2 className="header__logo">Get It Noted</h2>
          </div>
        </NavLink>
        {searchRestrict(location.pathname) && (
          <div className="navbar__search-container flex--row">
            <input
              type="text"
              className="navbar__search input__txt"
              placeholder="Search"
            />
            <button
              className="navbar__search-btn btn"
              onClick={() => {
                modal === "filters" ? setModal("") : setModal("filters");
                navigate("/search");
              }}
            >
              <span className="material-icons search__btn-icon">tune</span>
            </button>
          </div>
        )}
        <nav className="navbar__nav flex--row" ref={ref}>
          <li onClick={() => setListVisibility(!listVisibility)}>
            <a className="flex--row nav__account__container">
              <span className="material-icons account-icon" title="Account">
                account_circle
              </span>
              <span className="font__primary text__small">{auth.userName}</span>
              ▼
            </a>
            {listVisibility &&
              (!auth.status ? (
                <div className="dropdown-list secondary__font text__small">
                  <NavLink
                    to="/signin"
                    onClick={() => setListVisibility(!listVisibility)}
                  >
                    <li>Sign-In</li>
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setListVisibility(!listVisibility)}
                  >
                    <li>Sign-Up</li>
                  </NavLink>
                </div>
              ) : (
                <div className="dropdown-list secondary__font text__small">
                  <NavLink to="/">
                    <li
                      onClick={() => {
                        signOutHandler(setAuth);
                        setListVisibility(!listVisibility);
                      }}
                    >
                      Log-Out
                    </li>
                  </NavLink>
                </div>
              ))}
          </li>
        </nav>
      </header>
      {filterListVisibility && <Filters />}
    </div>
  );
};
export { Navbar };
