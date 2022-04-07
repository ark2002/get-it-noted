import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css"

const LandingPage = () => {
    return (
        <>
            <div className="landingpage__container flex--row">
                <div className="landingpage__aside flex--column">
                    <div>
                    <h1 className="primary__font text__xlarge">Get It Noted</h1>
                    <h2 className="primary__font">A Every Day users Notes App</h2>
                    </div>
                    <Link to="/notes" className="btn btn-color--primary btn-font--secondary text__small">
                        Get Started
                    </Link>
                </div>
                <img src="\assets\LandingPageMain.svg" className="hero__img" />
            </div>
        </>
    );
}

export { LandingPage };