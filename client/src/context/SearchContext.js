import { createContext, useEffect, useReducer } from "react"
import axios from "axios";

const INITIAL_STATE = {
    city: "",
    dates: [
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ],
    options: {
        maxPeople: 0,
        room: 0
    }
}
export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }
}
export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)

    return (
        <SearchContext.Provider value={{ city: state.city, dates: state.dates, options: state.options, dispatch }} >
            {children}
        </SearchContext.Provider>
    )
}