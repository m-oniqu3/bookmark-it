import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import coloursReducer from "./features/colours/coloursSlice";
import libraryReducer from "./features/library/librarySlice";
import searchReducer from "./features/search/searchSlice";
import shelfReducer from "./features/shelf/shelfSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    colours: coloursReducer,
    searches: searchReducer,
    bookStore: libraryReducer,
    bookShelf: shelfReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
