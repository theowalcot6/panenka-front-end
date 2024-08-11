import React, {createContext, useState} from 'react'

export const FilterContext = createContext()

export const FilterProvider = ({children}) => {
    const [filters, setFilters] = useState({
        activeDay: '',
        gender:'All',
        radius: null,
        gameType:null
    });

    const updateFilter = (newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    return (
        <FilterContext.Provider value={{filters, updateFilter}}>
            {children}
        </FilterContext.Provider>
    )
};