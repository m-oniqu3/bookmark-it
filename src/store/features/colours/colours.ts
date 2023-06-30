import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Colours = {
  bookId: string;
  colors: string;
};

// Redux slice
const bookColorsSlice = createSlice({
  name: "bookColours",
  initialState: {
    bookColours: {} as { [key: string]: string },
  },
  reducers: {
    addBookColors: (state, action: PayloadAction<Colours>) => {
      //add book colors to state
      Object.assign(state.bookColours, {
        [action.payload.bookId]: action.payload.colors,
      });
    },
  },
});

export const { addBookColors } = bookColorsSlice.actions;

export default bookColorsSlice.reducer;
