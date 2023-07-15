import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Books = { [key: string]: { bookId: string; timeAdded: number } };

type Shelf = {
  [key: string]: { createdAt: number; books: Books };
};

type BooksOnShelf = {
  [key: string]: string[];
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
    romance: { createdAt: 1625563200000, books: {} },
    sad: { createdAt: 1625563200000, books: {} },
    spicy: { createdAt: 1625563200000, books: {} },
    mystery: { createdAt: 1625563200000, books: {} },
    horror: { createdAt: 1625563200000, books: {} },
    easy: { createdAt: 1625563200000, books: {} },
    fantasy: { createdAt: 1625563200000, books: {} },
    fiction: { createdAt: 1625563200000, books: {} },
    "dark-fantasy": { createdAt: 1625563200000, books: {} },
    mafia: { createdAt: 1625563200000, books: {} },
    thriller: { createdAt: 1625563200000, books: {} },
    "sci-fi": { createdAt: 1625563200000, books: {} },
    "self-help": { createdAt: 1625563200000, books: {} },
    comedy: { createdAt: 1625563200000, books: {} },
    drama: { createdAt: 1625563200000, books: {} },
    manga: { createdAt: 1625563200000, books: {} },
    action: { createdAt: 1625563200000, books: {} },
    adventure: { createdAt: 1625563200000, books: {} },
    bios: { createdAt: 1625563200000, books: {} },
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
        state.shelves[payload] = { createdAt: Date.now(), books: {} };
        state.toast = { message: "Shelf created", type: "success" };
      }
    },

    addShelfToBook: (state, { payload }: PayloadAction<{ bookId: string; selectedShelf: string }>) => {
      const { bookId, selectedShelf } = payload;

      //check if book is already exist
      const isBookExist = !!Object.getOwnPropertyDescriptor(state.books, bookId);

      if (!isBookExist) {
        state.books[bookId] = [selectedShelf];
      } else {
        //check if shelf is already exist
        const isShelfExist = state.books[bookId].includes(selectedShelf);

        if (!isShelfExist) {
          state.books[bookId].push(selectedShelf);
        } else {
          // remove shelf from book
          const shelfIndex = state.books[bookId].indexOf(selectedShelf);
          state.books[bookId].splice(shelfIndex, 1);
        }
      }

      state.toast = { message: "Shelf Updated", type: "success" };
    },

    addBooksToShelf: (state, { payload }: PayloadAction<{ bookId: string; shelfName: string }>) => {
      const { bookId, shelfName } = payload;

      const currentShelf = state.shelves[shelfName].books;

      //check if book is already on shelf
      const isBookOnShelf = !!Object.getOwnPropertyDescriptor(currentShelf, bookId);

      if (isBookOnShelf) {
        //remove book from shelf
        delete currentShelf[bookId];
      } else {
        //add book to shelf
        currentShelf[bookId] = { bookId, timeAdded: Date.now() };
      }
    },
  },
});

export const { createShelf, addBooksToShelf, addShelfToBook } = shelfSlice.actions;
export default shelfSlice.reducer;
