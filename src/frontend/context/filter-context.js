import { useContext, createContext, useReducer } from "react";
import { filterReducer } from "../Reducer";
import { initialFilters } from "../Reducer";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {

    const [filters, dispatchFilters] = useReducer(filterReducer, initialFilters);

    return (
        <FilterContext.Provider value={{ filters, dispatchFilters }}>
            {children}
        </FilterContext.Provider>
    );
}

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };