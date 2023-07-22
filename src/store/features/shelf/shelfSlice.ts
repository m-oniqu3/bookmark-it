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
  toast: { message: string; type: "success" | "warning" | "error" | "info" | null };
};

const initialState: InitialShelfState = {
  shelves: {
    // romance: { createdAt: 1625563200000, books: {} },
    // sad: { createdAt: 1625563200000, books: {} },
    // spicy: { createdAt: 1625563200000, books: {} },
    // mystery: { createdAt: 1625563200000, books: {} },
    // horror: { createdAt: 1625563200000, books: {} },
    // easy: { createdAt: 1625563200000, books: {} },
    // fantasy: { createdAt: 1625563200000, books: {} },
    // fiction: { createdAt: 1625563200000, books: {} },
  },
  books: {},
  isShelfEmpty: true,
  toast: { message: "", type: null },
};

const shelfSlice = createSlice({
  name: "shelf",
  initialState,
  reducers: {
    createShelf: (state, { payload }: PayloadAction<string>) => {
      if (payload.toLowerCase() === "all") {
        state.toast = {
          message: "This shelf name is reserved",
          type: "error",
        };
        return;
      }

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
    removeShelf: (state, { payload }: PayloadAction<string>) => {
      const selectedShelf = payload;

      // delete it from shelves
      delete state.shelves[selectedShelf];

      // delete it from books
      const shelvesForBooks = Object.values(state.books);
      shelvesForBooks.map((shelves) => {
        const index = shelves.indexOf(selectedShelf);
        shelves.splice(index, 1);
      });

      state.toast = { message: "Shelf Removed", type: "success" };
    },

    renameShelf: (state, { payload }: PayloadAction<{ currentShelf: string; newShelf: string }>) => {
      const { currentShelf, newShelf } = payload;
      const { shelves, books } = state;

      // check if shelf exist
      const isShelfCreated = !!Object.getOwnPropertyDescriptor(shelves, currentShelf);

      if (!isShelfCreated) {
        state.toast = { message: "Shelf does not exist", type: "error" };
      }

      shelves[newShelf] = Object.assign({}, shelves[currentShelf]);
      console.log(shelves[newShelf]);
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
    },
  },
});

export const { createShelf, addBooksToShelf, addShelfToBook, removeShelf, renameShelf } = shelfSlice.actions;
export default shelfSlice.reducer;
