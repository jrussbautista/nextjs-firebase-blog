import { createContext } from "react";

export const initialState = {
  user: null,
  isLoading: true,
  error: null,
};

export const AuthContext = createContext(initialState);
