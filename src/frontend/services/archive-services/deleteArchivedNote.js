import axios from "axios";

export const deleteArchivedNote = async (token, id) => {
    try {
        const { data } = await axios.delete(`/api/archives/delete/${id}`, {
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