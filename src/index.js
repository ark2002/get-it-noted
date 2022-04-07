import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { ArchivesProvider, AuthProvider, FilterProvider, NotesProvider } from "./frontend/context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <ArchivesProvider>
            <FilterProvider>
              <App />
            </FilterProvider>
          </ArchivesProvider>
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode >,
  document.getElementById("root")
);
