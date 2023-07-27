import Books from "../components/books/Books";
import { useAppSelector } from "../store/hooks/hooks";

const useFilterShelf = (filter: string, author: string) => {
  const { library } = useAppSelector((state) => state.bookStore);
  const { shelves } = useAppSelector((state) => state.bookShelf);

  const filterResults = (function () {
    if (filter === "All") {
      return Object.values(library).sort((a, b) => b.timeAdded - a.timeAdded);
    } else {
      const shelf = shelves[filter];
      const books = Object.values(shelf.books);

      return books.sort((a, b) => b.timeAdded - a.timeAdded).map((book) => library[book.bookId]);
    }
  })();

  const authorResults = (() => {
    if (author !== "All") {
      return filterResults
        .filter((book) => {
          const bookAuthor = book.bookInfo.authors ? book.bookInfo.authors[0] : "";
          return bookAuthor === author;
        })
        .sort((a, b) => b.timeAdded - a.timeAdded);
    } else return filterResults;
  })();

  const allAuthors = Object.values(library).map((book) => {
    const author = book.bookInfo.authors ? book.bookInfo.authors[0] : "";
    return author;
  });

  const authors = [...new Set(allAuthors)].sort();

  const books = authorResults.map((book) => {
    return (
      <Books
        key={book.bookInfo.id}
        book={book.bookInfo}
        modalType="shelf"
        showBookmarkIcon={false}
        showShelfIcon={true}
      />
    );
  });

  return { authors, books };
};

export default useFilterShelf;
