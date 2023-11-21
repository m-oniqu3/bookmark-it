import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Colours = {
  bookId: string;
  color: string;
};

type Palette = {
  bookId: string;
  palette: string[];
};

const bookColorsSlice = createSlice({
  name: "bookColours",
  initialState: {
    bookColours: {} as { [key: string]: string },
    bookPalette: {} as { [key: string]: string[] },
  },
  reducers: {
    addBookColors: (state, action: PayloadAction<Colours>) => {
      //add book colors to state
      Object.assign(state.bookColours, {
        [action.payload.bookId]: action.payload.color,
      });
    },
    addBookPalette: (state, action: PayloadAction<Palette>) => {
      Object.assign(state.bookPalette, {
        [action.payload.bookId]: action.payload.palette,
      });
    },
  },
});

export const { addBookColors, addBookPalette } = bookColorsSlice.actions;

export default bookColorsSlice.reducer;
