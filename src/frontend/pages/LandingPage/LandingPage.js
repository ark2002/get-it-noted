import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css"

const LandingPage = () => {
    return (
        <>
        <div className="landingpage__container flex--row">
            Landing Page

            <Link to="/notes" className="btn btn-color--primary btn-font--secondary text__small">
                Temporary button for PR
            </Link>
        </div>
        </>
    );
}

export { LandingPage };