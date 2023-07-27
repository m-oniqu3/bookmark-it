/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import server_down from "../../assets/server_down.svg";
import web_search from "../../assets/web_search.svg";
import { useGetSpecificCategoryQuery } from "../../store/features/api/apiSlice";
import { StyledGrid } from "../../styles/StyledGrid";
import Books from "../books/Books";
import Empty from "../helpers/ui/Empty";
import Loading from "../helpers/ui/Loading";
import { selectSearchResults } from "../utils/selectors";

const Recs = () => {
  const { category } = useParams<{ category: string }>() as { category: string };

  const { books, error, isFetching, isLoading, isSuccess } = useGetSpecificCategoryQuery(category, {
    selectFromResult: (result: any) => selectSearchResults(result),
  });

  const content = (() => {
    if (isLoading || isFetching) return <Loading />;

    if (error)
      return (
        <Empty
          src={server_down}
          heading="Something went wrong"
          message="Try searching for another book or visit the Explore page."
          buttonName="Explore"
          route="/explore/picks/all"
        />
      );

    if (!isSuccess || !books)
      return (
        <Empty
          src={web_search}
          heading="No results found"
          message="Try searching for another book or visit the Explore page."
          buttonName="Explore"
          route="/explore/picks/all"
        />
      );

    if (isSuccess && books) {
      if (books.length === 0)
        return (
          <Empty
            src={web_search}
            heading="No results found"
            message="Try searching for another book or visit the Explore page."
            buttonName="Explore"
            route="/explore/picks/all"
          />
        );

      return (
        <StyledGrid>
          {books
            // remove books without an image
            .filter((book) => book.imageLinks?.smallThumbnail !== undefined)
            .map((book) => {
              return (
                <Books key={book.id} book={book} modalType="library" showBookmarkIcon={true} showShelfIcon={false} />
              );
            })}
        </StyledGrid>
      );
    }
  })();

  return content;
};

export default Recs;
