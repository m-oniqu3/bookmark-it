import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../../types/Book";

type Record = { bookInfo: Book; category: string; timeAdded: number };

type BookRecord = Map<string, Record>;

type LibraryState = {
  library: BookRecord;
  duplicateBookCategory: string;
  toast: { message: string; type: string };
};

const initialState: LibraryState = {
  library: new Map(),
  duplicateBookCategory: "",
  toast: { message: "", type: "" },
};
const librarySlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addToLibrary: (state, { payload }: PayloadAction<Record>) => {
      const { bookInfo, category, timeAdded } = payload;
      const { id } = bookInfo;
      //check if book exists
      const isDuplicateBook = state.library.has(id);

      if (!isDuplicateBook) {
        state.library.set(id, { bookInfo, category, timeAdded });
      }

      //no book, add book
      // If book is already in library, check if it is in the same category
      //if the categories are different, update the category and timeAdded of the bookAlreadyInLibrary object
    },
  },
});

export default librarySlice.reducer;
