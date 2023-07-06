import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../../types/Book";

type BookRecord = {
  [key: string]: { bookData: Book; category: string; timeAdded: number };
};

type LibraryState = {
  library: BookRecord;
  duplicateBookCategory: string;
  toast: { message: string; type: string };
};

const initialState: LibraryState = {
  library: {},
  duplicateBookCategory: "",
  toast: { message: "", type: "" },
};
const librarySlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
});

export default librarySlice.reducer;
