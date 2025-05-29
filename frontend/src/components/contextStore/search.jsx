import { createContext, useReducer, useState } from "react";

export const SearchContext = createContext();

function reducer(state, action) {
  return { search: action.search, data: action.data };
}

export const SearchProvider = function ({ children }) {
  const initialstate = {
    search: false,
    data: [],
  };

  const [state, dispatch] = useReducer(reducer, initialstate);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
