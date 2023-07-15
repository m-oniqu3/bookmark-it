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
  shelves: {
    romance: { createdAt: 1625563200000, books: [] },
    sad: { createdAt: 1625563200000, books: [] },
    spicy: { createdAt: 1625563200000, books: [] },
    mystery: { createdAt: 1625563200000, books: [] },
    horror: { createdAt: 1625563200000, books: [] },
    easy: { createdAt: 1625563200000, books: [] },
    fantasy: { createdAt: 1625563200000, books: [] },
    fiction: { createdAt: 1625563200000, books: [] },
    "dark-fantasy": { createdAt: 1625563200000, books: [] },
    mafia: { createdAt: 1625563200000, books: [] },
    thriller: { createdAt: 1625563200000, books: [] },
    "sci-fi": { createdAt: 1625563200000, books: [] },
    "self-help": { createdAt: 1625563200000, books: [] },
    comedy: { createdAt: 1625563200000, books: [] },
    drama: { createdAt: 1625563200000, books: [] },
    manga: { createdAt: 1625563200000, books: [] },
    action: { createdAt: 1625563200000, books: [] },
    adventure: { createdAt: 1625563200000, books: [] },
    bios: { createdAt: 1625563200000, books: [] },
  },
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
