export const initialFilters = {
    labelFilter: "",
    priorityFilter: "",
    timeSort: ""
}

export const filterReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "LABELSFILTER":
            return { ...state, labelFilter: payload };
        case "PRIORITYFILTER":
            return { ...state, priorityFilter: payload };
        case "TIMESORT":
            return { ...state, timeSort: payload };
        case "RESET":
            return initialFilters;
        default:
            return state;
    }
}