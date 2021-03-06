export const notesPriorityFiltered = (notes, filters) => {
    switch (filters) {
        case "HIGH":
            return notes.filter((note) => note.priority === "HIGH");
        case "MEDIUM":
            return notes.filter((note) => note.priority === "MEDIUM");
        case "LOW":
            return notes.filter((note) => note.priority === "LOW");
        default:
            return notes
    }
}