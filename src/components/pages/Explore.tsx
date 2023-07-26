/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from "react";
import { styled } from "styled-components";
import useExplore from "../../hooks/useExplore";
import { StyledTitle } from "../../styles/StyledTitle";
import { devices } from "../../styles/breakpoints";
import { Book } from "../../types/Book";
import ExploreGenres from "../explore/ExploreGenres";
import ExploreSubjects from "../explore/ExploreSubjects";
import Container from "../helpers/ui/Container";

const StyledExplore = styled(Container)`
  padding: 1.5rem 0;

  @media (${devices.large}) {
    display: grid;
    grid-template-columns: 1fr 15.5rem;
    gap: 3rem;

    aside {
      order: 1;
    }
  }

  aside {
    .list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      overflow-x: scroll;
      scrollbar-width: none;
      padding-bottom: 1rem;
      height: fit-content;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

type Source = "api" | "local";

const Explore = () => {
  const [selectedGenre, setSelectedGenre] = useState<{ genre: string; type: Source }>({
    genre: "all",
    type: "local",
  });

  const exploreBooks = useExplore(selectedGenre.genre) as Book[];

  // const [dataSource, setDataSource] = useState<Book[]>(exploreBooks);
  // const [trigger, { books, error, isFetching, isLoading, isSuccess }] = useLazyGetSpecificCategoryQuery({
  //   selectFromResult(result: any) {
  //     const items = result.data?.items;

  //     return {
  //       books: items?.map((item: any) => ({
  //         id: item.id,
  //         title: item.volumeInfo.title,
  //         authors: item.volumeInfo.authors,
  //         publishedDate: item.volumeInfo.publishedDate,
  //         categories: item.volumeInfo?.categories,
  //         description: item.volumeInfo?.description,
  //         imageLinks: item.volumeInfo.imageLinks,
  //         searchInfo: item.searchInfo,
  //         averageRating: item.volumeInfo.averageRating,
  //         ratingsCount: item.volumeInfo.ratingsCount,
  //       })) as Book[],

  //       isLoading: result.isLoading,
  //       error: result.error,
  //       isSuccess: result.isSuccess,
  //       isFetching: result.isFetching,
  //     };
  //   },
  // });

  // const content = (() => {
  //   if (selectedGenre.type === "local") {
  //     return (
  //       <StyledExplore>
  //         <aside>
  //           <div className="categories">
  //             <StyledTitle className="title">Bookmark's Picks</StyledTitle>
  //             <Fragment>{renderedGenres}</Fragment>
  //           </div>
  //           <div className="categories">
  //             <StyledTitle className="title">Other Genres</StyledTitle>
  //             <Fragment>{renderedSubjects}</Fragment>
  //           </div>
  //         </aside>

  //         <StyledGrid>
  //           {dataSource
  //             .filter((book) => {
  //               return book.imageLinks?.smallThumbnail !== undefined;
  //             })
  //             .map((book) => {
  //               return <Books key={book.id} book={book} modalType="library" showBookmarkIcon={true} />;
  //             })}
  //         </StyledGrid>
  //       </StyledExplore>
  //     );
  //   } else if (selectedGenre.type === "api") {
  //     if (isLoading || isFetching) return <Loading />;

  //     if (error) return <p>Error</p>;

  //     if (!isSuccess || !books) return <p>No results</p>;

  //     if (isSuccess && books) {
  //       if (books.length === 0) return <p>No results found</p>;

  //       return (
  //         <StyledExplore>
  //           <aside>
  //             <div className="categories">
  //               <StyledTitle className="title">Bookmark's Picks</StyledTitle>
  //               <Fragment>{renderedGenres}</Fragment>
  //             </div>
  //             <div className="categories">
  //               <StyledTitle className="title">Other Genres</StyledTitle>
  //               <Fragment>{renderedSubjects}</Fragment>
  //             </div>
  //           </aside>
  //           <StyledGrid>
  //             {dataSource
  //               .filter((book) => {
  //                 return book.imageLinks?.smallThumbnail !== undefined;
  //               })
  //               .map((book) => {
  //                 return <Books key={book.id} book={book} modalType="library" showBookmarkIcon={true} />;
  //               })}
  //           </StyledGrid>
  //         </StyledExplore>
  //       );
  //     }
  //   }
  // })();

  return (
    <Fragment>
      <StyledExplore>
        <aside>
          <StyledTitle className="title">Bookmark's Picks</StyledTitle>
          <div className="list">
            <ExploreGenres />
          </div>

          <StyledTitle className="title">Other Genres</StyledTitle>
          <div className="list">
            <ExploreSubjects />
          </div>
        </aside>

        <div>books go here</div>
      </StyledExplore>
    </Fragment>
  );
};

export default Explore;
