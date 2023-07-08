import Books from "../components/books/Books";
import { useAppSelector } from "../store/hooks/hooks";
import { Filter } from "../types/Book";

const useFilterLibrary = (filter: Filter, author: string) => {
  const { library } = useAppSelector((state) => state.bookStore);

  const filterResults = (() => {
    if (filter !== "All") {
      return Object.values(library)
        .filter((book) => book.category === filter)

        .sort((a, b) => b.timeAdded - a.timeAdded);
    } else return Object.values(library).sort((a, b) => b.timeAdded - a.timeAdded);
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

  const authors = [...new Set(allAuthors)];
  //   console.log(authors);

  const books = authorResults.map((record) => {
    return <Books key={record.bookInfo.id} book={record.bookInfo} modalType="library" />;
  });

  return { authors, books };
};

export default useFilterLibrary;
