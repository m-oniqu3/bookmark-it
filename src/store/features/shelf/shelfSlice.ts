import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addShelvesToFirebase } from "../../../firebase/firebase";

type Books = { [key: string]: { bookId: string; timeAdded: number } };

export type Shelf = {
  [key: string]: { createdAt: number; books: Books };
};

export type BooksOnShelf = {
  [key: string]: string[];
};

type InitialShelfState = {
  shelves: Shelf;
  books: BooksOnShelf;
  isShelfEmpty: boolean;
  toast: { message: string; type: "success" | "warning" | "error" | "info" | null };
};

const initialState: InitialShelfState = {
  shelves: {},
  books: {},
  isShelfEmpty: true,
  toast: { message: "", type: null },
};

const shelfSlice = createSlice({
  name: "shelf",
  initialState,
  reducers: {
    createShelf: (state, { payload }: PayloadAction<{ shelfName: string; user: string }>) => {
      const { shelfName, user } = payload;
      if (shelfName.toLowerCase() === "all") {
        state.toast = {
          message: "This shelf name is reserved",
          type: "error",
        };
        return;
      }

      const isDuplicateShelf = !!Object.getOwnPropertyDescriptor(state.shelves, shelfName);

      //check if shelf exist
      if (isDuplicateShelf) {
        state.toast = {
          message: "This shelf already exists",
          type: "error",
        };
      } else {
        state.shelves[shelfName] = { createdAt: Date.now(), books: {} };
        state.toast = { message: "Shelf created", type: "success" };
      }

      addShelvesToFirebase(user, state.books, state.shelves);
    },

    addShelfToBook: (state, { payload }: PayloadAction<{ bookId: string; selectedShelf: string; user: string }>) => {
      const { bookId, selectedShelf, user } = payload;

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
      addShelvesToFirebase(user, state.books, state.shelves);
    },

    addBooksToShelf: (state, { payload }: PayloadAction<{ bookId: string; shelfName: string; user: string }>) => {
      const { bookId, shelfName, user } = payload;

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

      addShelvesToFirebase(user, state.books, state.shelves);
    },
    removeShelf: (state, { payload }: PayloadAction<{ selectedShelf: string; user: string }>) => {
      const { selectedShelf, user } = payload;

      // delete it from shelves
      delete state.shelves[selectedShelf];

      // delete it from books
      const shelvesForBooks = Object.values(state.books);
      shelvesForBooks.map((shelves) => {
        const index = shelves.indexOf(selectedShelf);
        shelves.splice(index, 1);
      });

      state.toast = { message: "Shelf Removed", type: "success" };
      addShelvesToFirebase(user, state.books, state.shelves);
    },

    renameShelf: (state, { payload }: PayloadAction<{ currentShelf: string; newShelf: string; user: string }>) => {
      const { currentShelf, newShelf, user } = payload;
      const { shelves, books } = state;

      // check if shelf exist
      const isShelfCreated = !!Object.getOwnPropertyDescriptor(shelves, currentShelf);

      if (!isShelfCreated) {
        state.toast = { message: "Shelf does not exist", type: "error" };
      }

      shelves[newShelf] = Object.assign({}, shelves[currentShelf]);
      delete shelves[currentShelf];

      // update books

      const booksOnShelf = Object.values(books);

      booksOnShelf.map((shelves) => {
        // get index of current shelf then replace it with new shelf
        const index = shelves.indexOf(currentShelf);

        if (index !== -1) {
          shelves[index] = newShelf;
        }
      });

      state.toast = { message: "Shelf Renamed", type: "success" };
      addShelvesToFirebase(user, books, shelves);
    },
    populateShelf: (state, { payload }: PayloadAction<{ books: BooksOnShelf; shelves: Shelf }>) => {
      const { books, shelves } = payload;
      state.books = books;
      state.shelves = shelves;
    },
    clearShelf: (state) => {
      state.books = {};
      state.shelves = {};
      state.isShelfEmpty = true;
      state.toast = { message: "", type: null };
    },
  },
});

export const { createShelf, addBooksToShelf, addShelfToBook, removeShelf, renameShelf, populateShelf, clearShelf } =
  shelfSlice.actions;
export default shelfSlice.reducer;
