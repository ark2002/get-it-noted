import axios from "axios";

export const getArchivedNotesService = async (token) => {
    try {
        const { data } = await axios.get("/api/archives", {
            headers: {
                authorization: token,
            },
        });
        return data.archives;
    } catch (error) {
        console.error(error);
        return;
    }
};