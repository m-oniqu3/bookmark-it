/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useGetSearchResultsQuery } from "../../store/features/api/apiSlice";
import { StyledGrid } from "../../styles/StyledGrid";
import { devices } from "../../styles/breakpoints";
import Books from "../books/Books";

import server_down from "../../assets/server_down.svg";
import web_search from "../../assets/web_search.svg";
import Sidebar from "../books/Sidebar";
import Container from "../helpers/ui/Container";
import Empty from "../helpers/ui/Empty";
import LoadingSearch from "../helpers/ui/LoadingSearch";
import { selectSearchResults } from "../utils/selectors";

const StyledSearchResults = styled.div`
  padding: 1.5rem 0;
  width: 100%;

  @media (${devices.large}) {
    display: grid;
    grid-template-columns: 1fr 15.5rem;
    gap: 3rem;

    aside {
      order: 1;
    }
  }
`;

const SearchResults = () => {
  const { query } = useParams() as { query: string };
  const { books, isFetching, isLoading, error, isSuccess } = useGetSearchResultsQuery(
    query,
    //select the data we want from the response if there is a query
    { selectFromResult: (result: any) => selectSearchResults(result) }
  );

  const content = (() => {
    if (isLoading || isFetching) {
      return <LoadingSearch />;
    } else if (error) {
      return (
        <Empty
          src={server_down}
          heading="Something went wrong"
          message="Try searching for another book or visit the Explore page."
          buttonName="Explore"
          route="/explore/picks/all"
        />
      );
    } else if (isSuccess && books) {
      if (books.length === 0) {
        return (
          <Empty
            src={web_search}
            heading="No results found"
            message="Try searching for another book or visit the Explore page."
            buttonName="Explore"
            route="/explore/picks/all"
          />
        );
      }

      return (
        <StyledSearchResults>
          <Sidebar books={books} />

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
        </StyledSearchResults>
      );
    }
  })();

  return <Container>{content}</Container>;
};

export default SearchResults;
