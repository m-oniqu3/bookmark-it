/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetSpecificCategoryQuery } from "../../store/features/api/apiSlice";
import { StyledGrid } from "../../styles/StyledGrid";
import { Book } from "../../types/Book";
import Books from "../books/Books";
import Loading from "../helpers/ui/Loading";

const Recs = () => {
  const { category } = useParams<{ category: string }>() as { category: string };

  console.log(category);

  const { books, error, isFetching, isLoading, isSuccess } = useGetSpecificCategoryQuery(category, {
    selectFromResult(result: any) {
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
    },
  });

  const content = (() => {
    if (isLoading || isFetching) return <Loading />;

    if (error) return <p>Error</p>;

    if (!isSuccess || !books) return <p>No results</p>;

    if (isSuccess && books) {
      if (books.length === 0) return <p>No results found</p>;

      return (
        <StyledGrid>
          {books
            // remove books without an image
            .filter((book) => book.imageLinks?.smallThumbnail !== undefined)
            .map((book) => {
              return <Books key={book.id} book={book} modalType="library" showBookmarkIcon={true} />;
            })}
        </StyledGrid>
      );
    }
  })();

  return content;
};

export default Recs;
