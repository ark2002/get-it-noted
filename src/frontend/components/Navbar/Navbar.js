import React,{ useState } from "react";
import "./Navbar.css"

const Navbar = () => {
    const [listVisibility, setListVisibility] = useState(false)
    return (
        <>
            <header className="header flex--row">
                <a href="/index.html">
                    <div className="header__logo-container flex--row">
                        <img src="/assets/Logo.png" alt="logo image" className="logo__img" />
                        <h2 className="header__logo">Get It Noted</h2>
                    </div>
                </a>
                <div className="navbar__search-container flex--row">
                    <input type="text" className="navbar__search input__txt" placeholder="Search" />
                    <button className="navbar__search-btn btn">
                        <span className="material-icons search__btn-icon">search</span>
                    </button>
                </div>
                <nav className="navbar__nav flex--row">
                    <ul>
                        <li onClick={()=>setListVisibility(!listVisibility)}>
                            <a className="flex--row nav__account__container"><span className="material-icons account-icon" title="Account">account_circle</span>
                                <span className="font__primary text__small">Name </span>▼
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
            {listVisibility && <div className="dropdown-list secondary__font text__small">
                <li>Log Out</li></div>}
        </>
    );
}
export { Navbar };