import React from "react";
import "./Footer.css";

const Footer = () => {

    return (
        <>
            <footer className="footer">
                <h2 className="primary__font text__medium footer__heading">Our Social Media Presence</h2>
                <hr />
                <div className="footer__links flex--row">
                    <a href="https://github.com/ark2002"><i id="footgit" className="fab fa-github icon footer__socials"></i></a>
                    <a href="https://www.linkedin.com/in/aryaklahane"><i id="footlinked" className="fab fa-linkedin icon footer__socials"></i></a>
                    <a href="https://medium.com/@aryakprakashlahane"><i id="footmed" className="fab fa-medium icon footer__socials"></i></a>
                </div>
            </footer>
        </>
    );
}

export { Footer }