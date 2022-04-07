import axios from "axios";

export const restoreArchivedNoteService = async (token, id) => {
    try {
        const { data } = await axios.post(`/api/archives/restore/${id}`,
        {}, {
            headers: {
                authorization: token,
            },
        });
        return data;
    } catch (error) {
        console.error(error);
        return;
    }
};