import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookCategory } from "../../../types/Book";

type Record = { bookInfo: Book; category: BookCategory; timeAdded: number };

type BookRecord = {
  [key: string]: Record;
};

type LibraryState = {
  library: BookRecord;
  duplicateBookCategory: string;
  toast: { message: string; type: "success" | "warning" | "error" | null };
};

const initialState: LibraryState = {
  library: {},
  duplicateBookCategory: "",
  toast: { message: "", type: null },
};

const librarySlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addToLibrary: (state, { payload }: PayloadAction<Record>) => {
      if (!payload) {
        state.toast = { message: "No data received", type: "error" };
      }

      const { bookInfo, category, timeAdded } = payload;
      const { id } = bookInfo;

      //check if book exists
      const isDuplicateBook = !!Object.getOwnPropertyDescriptor(state.library, id);

      if (isDuplicateBook) {
        const duplicateBook = state.library[id];
        const duplicateCategory = duplicateBook.category;

        if (duplicateCategory === category) {
          state.toast = {
            message: "This book is already in your library in this category",
            type: "warning",
          };
        }

        const updatedBook = { ...duplicateBook, category, timeAdded: Date.now() };
        state.library[id] = updatedBook;
      }

      state.library[id] = { bookInfo, category, timeAdded };
    },
  },
});

export const { addToLibrary } = librarySlice.actions;

export default librarySlice.reducer;
