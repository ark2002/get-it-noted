import axios from "axios";

export const deleteNoteFromDbService = async (token, id) => {
    try {
        const { data } = await axios.delete(`/api/notes/${id}`, {
            headers: {
                authorization: token,
            },
        });
        return data.notes;
    } catch (error) {
        console.error(error);
        return;
    }
};