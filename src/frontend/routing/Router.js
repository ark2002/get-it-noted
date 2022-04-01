import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ArchivesPage, LabelsPage, LandingPage, NotesPage, SignInPage, SignUpPage, TrashPage } from "../pages";
import { PrivateRoute } from "../components";
import { useAuth } from "../context"

const Router = () => {
    const { auth: { status }, } = useAuth();
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/notes" element={<PrivateRoute><NotesPage /></PrivateRoute>} />
                <Route path="/labels" element={<PrivateRoute><LabelsPage /></PrivateRoute>} />
                <Route path="/archives" element={<PrivateRoute><ArchivesPage /></PrivateRoute>} />
                <Route path="/trash" element={<PrivateRoute><TrashPage /></PrivateRoute>} />
                {!status && (
                    <>
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                    </>
                )}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </>
    );
}
export { Router };