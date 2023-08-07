import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addLibraryToFirebase } from "../../../firebase/firebase";
import { Book, BookCategory } from "../../../types/Book";

interface Record {
  bookInfo: Book;
  category: BookCategory;
  timeAdded: number;
}

export type BookRecord = {
  [key: string]: Record;
};

type LibraryState = {
  library: BookRecord;
  duplicateBookCategory: BookCategory | null;
  toast: { message: string; type: "success" | "warning" | "error" | "info" | null };
};

interface ExtendedRecord extends Record {
  user: string;
}

const initialState: LibraryState = {
  library: {},
  duplicateBookCategory: null,
  toast: { message: "", type: null },
};

const librarySlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addToLibrary: (state, { payload }: PayloadAction<ExtendedRecord>) => {
      if (!payload) {
        state.toast = { message: "No data received", type: "error" };
      }

      const { bookInfo, category, timeAdded, user } = payload;
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
          state.toast = { message: "Category updated", type: "info" };
        }
      } else {
        state.library[id] = { bookInfo, category, timeAdded };
        state.toast = { message: "Book added to library", type: "success" };
      }

      addLibraryToFirebase(user, state.library);
    },
    getActiveBookCategory: (state, { payload }: PayloadAction<string>) => {
      const id = payload;

      const book = state.library[id];
      state.duplicateBookCategory = book ? book.category : null;
    },
  },
});

export const { addToLibrary, getActiveBookCategory } = librarySlice.actions;

export default librarySlice.reducer;
