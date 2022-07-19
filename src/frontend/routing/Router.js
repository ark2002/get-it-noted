import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  ArchivesPage,
  LabelsPage,
  LandingPage,
  NotesPage,
  SearchPage,
  SignInPage,
  SignUpPage,
  TrashPage,
} from "../pages";
import { PrivateRoute } from "../components";
import { useAuth } from "../context";
import { ScrollToTop } from "../hooks/ScrollToTop";

const Router = () => {
  const {
    auth: { status },
  } = useAuth();
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <NotesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/labels"
            element={
              <PrivateRoute>
                <LabelsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/archives"
            element={
              <PrivateRoute>
                <ArchivesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/trash"
            element={
              <PrivateRoute>
                <TrashPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchPage />
              </PrivateRoute>
            }
          />
          {!status && (
            <>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </>
          )}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </ScrollToTop>
    </>
  );
};
export { Router };
