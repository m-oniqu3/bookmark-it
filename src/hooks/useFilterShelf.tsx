import Books from "../components/books/Books";
import { useAppSelector } from "../store/hooks/hooks";

const useFilterShelf = (filter: string) => {
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

  return filterResults.map((book) => {
    return <Books key={book.bookInfo.id} book={book.bookInfo} modalType="shelf" showBookmarkIcon={false} />;
  });
};

export default useFilterShelf;
