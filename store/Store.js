import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "./apps/notes/NotesSlice";
import CustomizerReducer from "./customizer/CustomizerSlice";
export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    notesReducer: NotesReducer,
  },
});

export default store;
