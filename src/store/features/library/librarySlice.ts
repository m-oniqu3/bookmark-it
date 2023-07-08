import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookCategory } from "../../../types/Book";

type Record = { bookInfo: Book; category: BookCategory; timeAdded: number };

type BookRecord = {
  [key: string]: Record;
};

type LibraryState = {
  library: BookRecord;
  duplicateBookCategory: BookCategory | null;
  toast: { message: string; type: "success" | "warning" | "error" | "info" | null };
};

const initialState: LibraryState = {
  library: {},
  duplicateBookCategory: null,
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
          delete state.library[id];
          state.toast = { message: "Book removed from library", type: "info" };
        } else {
          const updatedBook = { ...duplicateBook, category, timeAdded: Date.now() };
          state.library[id] = updatedBook;
        }
      } else {
        state.library[id] = { bookInfo, category, timeAdded };
        state.toast = { message: "Book added to library", type: "success" };
      }
    },
    getCategory: (state, { payload }: PayloadAction<string>) => {
      const id = payload;

      const book = state.library[id];
      state.duplicateBookCategory = book ? book.category : null;
    },
  },
});

export const { addToLibrary, getCategory } = librarySlice.actions;

export default librarySlice.reducer;
