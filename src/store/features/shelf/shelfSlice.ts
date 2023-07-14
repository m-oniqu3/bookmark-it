import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../../types/Book";

type Shelf = {
  [key: string]: { bookId: Pick<Book, "id">; timeAdded: number }[];
};

type BooksOnShelf = {
  [key: string]: { shelf: string; timeAdded: number }[];
};

type InitialShelfState = {
  shelf: Shelf;
  books: BooksOnShelf;
  isShelfEmpty: boolean;
  currentBookShelves: string[];
  shelfFeedback: { message: string; type: string };
};

const initialState: InitialShelfState = {
  shelf: {},
  books: {},
  isShelfEmpty: true,
  currentBookShelves: [],
  shelfFeedback: { message: "", type: "" },
};

const shelfSlice = createSlice({
  name: "shelf",
  initialState,
  reducers: {},
});

export default shelfSlice.reducer;
