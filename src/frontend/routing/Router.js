import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage, NotesPage, SignInPage, SignUpPage } from "../pages";

const Router = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </>
    );
}
export { Router };