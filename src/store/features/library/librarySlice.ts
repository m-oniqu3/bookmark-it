import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../../types/Book";

type Record = { bookData: Book; category: string; timeAdded: number };

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
  reducers: {},
});

export default librarySlice.reducer;
