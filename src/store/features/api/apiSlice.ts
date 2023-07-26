import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1/volumes",
  }),
  endpoints: (builder) => ({
    getSearchResults: builder.query({
      query: (searchQuery: string) => `?q=${searchQuery}&orderBy=relevance&maxResults=40&printType=books&key=${apiKey}`,
    }),
    getBookDetails: builder.query({
      query: (bookId: string) => `/${bookId}`,
    }),
    getSpecificCategory: builder.query({
      query: (category: string) =>
        `?q=subject:${category}&orderBy=relevance&maxResults=40&printType=books&key=${apiKey}`,
    }),
  }),
});

export const { useGetSearchResultsQuery, useGetBookDetailsQuery, useLazyGetSpecificCategoryQuery } = apiSlice;
