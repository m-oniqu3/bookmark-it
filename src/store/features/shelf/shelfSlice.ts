import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../../types/Book";

type Books = { bookId: Pick<Book, "id">; timeAdded: number };

type Shelf = {
  [key: string]: { createdAt: number; books: Books[] };
};

type BooksOnShelf = {
  [key: string]: { shelf: string; timeAdded: number }[];
};

type InitialShelfState = {
  shelves: Shelf;
  books: BooksOnShelf;
  isShelfEmpty: boolean;
  currentBookShelves: string[];
  toast: { message: string; type: "success" | "warning" | "error" | "info" | null };
};

const initialState: InitialShelfState = {
  shelves: {},
  books: {},
  isShelfEmpty: true,
  currentBookShelves: [],
  toast: { message: "", type: null },
};

const shelfSlice = createSlice({
  name: "shelf",
  initialState,
  reducers: {
    createShelf: (state, { payload }: PayloadAction<string>) => {
      const isDuplicateShelf = !!Object.getOwnPropertyDescriptor(state.shelves, payload);

      //check if shelf exist
      if (isDuplicateShelf) {
        state.toast = {
          message: "This shelf already exists",
          type: "error",
        };
      } else {
        state.shelves[payload] = { createdAt: Date.now(), books: [] };
        state.toast = { message: "Shelf created", type: "success" };
      }
    },
  },
});

export const { createShelf } = shelfSlice.actions;
export default shelfSlice.reducer;
