import React, { createContext, useContext, useState, useEffect } from "react";
import { getArchivedNotesService } from "../services";
import { useAuth } from "./auth-context";

const ArchivesContext = createContext();

const ArchivesProvider = ({ children }) => {
    const [archives, setArchives] = useState([]);

    const { auth } = useAuth();

    useEffect(() => {
        if (auth.status) {
            (async () => {
                const response = await getArchivedNotesService(auth.token);
                if (response !== undefined) {
                    setArchives(response)
                }
            })();
        } else {
            setArchives([]);
        }
    }, [auth])

    return (
        <ArchivesContext.Provider value={{ archives, setArchives }}>
            {children}
        </ArchivesContext.Provider>
    );

}

const useArchives = () => useContext(ArchivesContext);

export { ArchivesProvider, useArchives };