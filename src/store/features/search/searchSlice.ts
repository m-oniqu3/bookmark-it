import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    recentSearches: [] as string[],
  },
  reducers: {
    addSearch: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const { recentSearches } = state;

      if (recentSearches.length === 10) {
        recentSearches.pop();
      }

      const index = state.recentSearches.indexOf(payload);

      if (index > -1) {
        recentSearches.splice(index, 1);
      }

      recentSearches.unshift(payload);
    },

    removeSearch: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const { recentSearches } = state;
      const index = recentSearches.indexOf(payload);

      if (index > -1) {
        recentSearches.splice(index, 1);
      }
    },
  },
});

export const { addSearch, removeSearch } = searchSlice.actions;

export default searchSlice.reducer;
