import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notes";
import userReducer from "./user";
export const store = configureStore({
    reducer: {
        notes: notesReducer,
        user : userReducer,
    }
})