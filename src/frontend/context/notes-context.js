import React, { createContext, useContext, useState, useEffect } from "react";
import { getNotesFromDbService } from "../services";
import { useAuth } from "./auth-context";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);

    const { auth } = useAuth();

    useEffect(() => {
        if (auth.status) {
            (async () => {
                const response = await getNotesFromDbService(auth.token);
                if (response !== undefined) {
                    setNotes(response)
                }
            })();
        } else {
            setNotes([]);
        }
    }, [auth])


    return (
        <NotesContext.Provider value={{ notes, setNotes }}>
            {children}
        </NotesContext.Provider>
    );
}

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };

