import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context";
import { signUpService } from "../../services"

import "./SignUpPage.css";

function SignUpPage() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [visibilityToggle, setVisibilityToggle] = useState(false);

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const signUpHandler = async (user) => {
        const data = await signUpService(user);
        const { createdUser, encodedToken } = data;
        if (encodedToken !== undefined) {
            localStorage.setItem("AUTH_TOKEN", encodedToken);
            localStorage.setItem("USERNAME", createdUser.firstName);
            setAuth((auth) => ({
                ...auth,
                status: true,
                token: localStorage.getItem("AUTH_TOKEN"),
                userName: createdUser.firstName,
            }));
            navigate("/");
        }
    };

    return (
        <div className="signup__container flex--column">
            <form className="signup__form flex--column" onSubmit={(e) => {
                e.preventDefault();
                signUpHandler(user);
            }}>
                <h1 className="signup__header heading2 title primary__font">Sign-Up</h1>
                <input type="text" placeholder="First Name" className="input__txt username secondary__font" required value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                <input type="text" placeholder="Last Name" className="input__txt username secondary__font" required value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                <input type="email" placeholder="Email" className="input__txt password secondary__font" required value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <div className="flex--row password-field">
                    <input type={visibilityToggle ? "text" : "password"} placeholder="password" className="input__txt password secondary__font" minLength="8" required value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    <span className="material-icons" title={visibilityToggle ? "hide password" : "show password"} onClick={() => setVisibilityToggle(!visibilityToggle)}>
                        {visibilityToggle ? "visibility" : "visibility_off"}
                    </span></div>
                <button className="btn btn-color--tertiary btn-font--secondary">
                    Sign-up
                </button>
                <Link to="/signin" className="btn btn-transparent--primary btn-font--secondary text__small">
                    Existing account
                </Link>
            </form>
        </div>
    );
}

export { SignUpPage };