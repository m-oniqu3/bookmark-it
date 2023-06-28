/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useGetSearchResultsQuery } from "../../store/features/api/apiSlice";
import { StyledGrid } from "../../styles/StyledGrid";
import { devices } from "../../styles/breakpoints";
import type { Book } from "../../types/Book";
import Books from "../books/Books";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Loading from "../helpers/ui/Loading";

const StyledSearchResults = styled(Container)`
  padding: 1.5rem 0;

  aside {
    display: none;
  }

  @media (${devices.large}) {
    display: grid;
    grid-template-columns: 1fr 18rem;
    gap: 2rem;

    aside {
      position: sticky;
      top: 12vh;
      height: fit-content;
      padding: 0 1rem;
      border-left: 1px solid var(--neutral-light);
      display: block;

      .heading {
        font-size: 1.5rem;
        color: var(--secondary);
        font-family: "Roboto", sans-serif;
        font-weight: bold;
      }

      .genres {
        padding: 1rem 0;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
  }
`;

const bookGenres = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Self-Help",
  "Fantasy",
  "Horror",
  "Science Fiction",
  "Art",
  "Biography",
  "History",
  "Business",
  "Travel",
  "Cooking",
  "Poetry",
  "Children",
];

const SearchResults = () => {
  const { query } = useParams() as { query: string };
  const { books, isFetching, isLoading, error, isSuccess } =
    useGetSearchResultsQuery(
      query,
      //select the data we want from the response if there is a query
      {
        selectFromResult: (result) => {
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
            })) as Book[],

            isLoading: result.isLoading,
            error: result.error,
            isSuccess: result.isSuccess,
            isFetching: result.isFetching,
          };
        },
      }
    );
  const content = (() => {
    if (isLoading || isFetching) return <Loading />;

    if (error) return <p>Error</p>;

    if (isSuccess && books) {
      if (books.length === 0) return <p>No results found</p>;

      return (
        <Fragment>
          {books
            // remove books without an image
            .filter((book) => book.imageLinks?.smallThumbnail !== undefined)

            .map((book) => {
              return <Books key={book.id} book={book} modalType="library" />;
            })}
        </Fragment>
      );
    }
  })();

  return (
    <StyledSearchResults>
      <StyledGrid>{content}</StyledGrid>
      <aside>
        <h2 className="heading">Genres</h2>

        <div className="genres">
          {bookGenres.map((genre) => {
            return (
              <Button
                key={genre}
                buttonType="action"
                onClick={() => console.log("click")}
              >
                {genre}
              </Button>
            );
          })}
        </div>
      </aside>
    </StyledSearchResults>
  );
};

export default SearchResults;
