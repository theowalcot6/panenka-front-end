import React, {createContext, useState} from 'react'

export const LocationFilterContext = createContext()

export const LocationFilterProvider = ({children}) => {
    const [locationfilters, setLocationFilters] = useState({
        radius: 3
    });

    const updateLocationFilter = (newFilters) => {
        setLocationFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    return (
        <FilterContext.Provider value={{locationfilters, updateLocationFilter}}>
            {children}
        </FilterContext.Provider>
    )
};