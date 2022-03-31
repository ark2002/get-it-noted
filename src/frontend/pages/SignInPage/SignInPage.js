import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context";
import { signInService } from "../../services";

import "./SignInPage.css";

function SignInPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [passwordToggle, setPasswordToggle] = useState(false);

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const signInHandler = async (user) => {
        const data = await signInService(user);
        const {foundUser, encodedToken} = data;
        if (encodedToken !== undefined) {
            localStorage.setItem("AUTH_TOKEN", encodedToken);
            setAuth((auth) => ({
                ...auth,
                status: true,
                token: encodedToken,
                userName: foundUser.firstName,
            }));
            navigate("/");
        }
    };

    return (
        <div className="login__container flex--column">
            <form className=" login__form flex--column" onSubmit={(e) => {
                e.preventDefault();
                signInHandler(user);
            }}
            >
                <h1 className="login__header heading2 title primary__font">Sign-In</h1>
                <input type="email" placeholder="Email" className="input__txt username secondary__font" required value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <div className="flex--row password-field">
                    <input type={passwordToggle ? "text" : "password"} placeholder="password" className="input__txt password secondary__font" minLength="8" required value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    <span className="material-icons" title={passwordToggle ? "hide password" : "show password"} onClick={() => setPasswordToggle(!passwordToggle)}>
                        {passwordToggle ? "visibility" : "visibility_off"}
                    </span></div>                <div className="rememberme flex--row"><input type="checkbox" name="remember-me" id="remember-me" /><label htmlFor="remember-me" className="secondary__font">Remember Me</label></div>
                <button type="submit" className="btn btn-color--tertiary btn-font--secondary">
                    Sign-in
                </button>
                <div className="login__bottom-container flex--row">
                    <Link to="/signup" className="btn btn-color--primary btn-font--secondary text__small">
                        New Account
                    </Link>
                    <button className="btn btn-transparent--primary btn-font--secondary text__small" onClick={(e) => {
                        e.preventDefault();
                        signInHandler(
                            {
                                email: "guest@gmail.com",
                                password: "guest123",
                            },

                        );
                    }}
                    >
                        Guest Login
                    </button>
                </div>
                <Link to="/signin" className="secondary__font text__small forgotpassword">Forgot Password</Link>
            </form>
        </div>
    );
}

export { SignInPage };