/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from "../../types/Book";

type Details = {
  bookDetails: Book;
  isLoading: any;
  error: any;
  isSuccess: any;
  isFetching: any;
};

export const selectBookDetails = (result: any): Details => {
  return {
    bookDetails: {
      id: result.data?.id,
      title: result.data?.volumeInfo.title,
      subtitle: result.data?.volumeInfo.subtitle,
      authors: result.data?.volumeInfo.authors,
      publishedDate: result.data?.volumeInfo.publishedDate,
      categories: result.data?.volumeInfo?.categories,
      description: result.data?.volumeInfo?.description,
      imageLinks: result.data?.volumeInfo.imageLinks,
      searchInfo: result.data?.searchInfo,
      averageRating: result.data?.volumeInfo?.averageRating,
      ratingsCount: result.data?.volumeInfo?.ratingsCount,
    } as Book,

    isLoading: result.isLoading,
    error: result.error,
    isSuccess: result.isSuccess,
    isFetching: result.isFetching,
  };
};

export const selectSearchResults = (result: any) => {
  const items = result.data?.items;

  return {
    books: items?.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      publishedDate: item.volumeInfo.publishedDate,
      categories: item.volumeInfo?.categories,
      description: item.volumeInfo?.description,
      imageLinks: item.volumeInfo.imageLinks,
      searchInfo: item.searchInfo,
      averageRating: item.volumeInfo.averageRating,
      ratingsCount: item.volumeInfo.ratingsCount,
    })) as Book[],

    isLoading: result.isLoading,
    error: result.error,
    isSuccess: result.isSuccess,
    isFetching: result.isFetching,
  };
};
