import Books from "../components/books/Books";
import { exploreBooks } from "../components/utils/exploreBooks";

const useExplore = (subject: string) => {
  const results = exploreBooks.filter((book) => {
    return book.subject
      .map((subject) => subject.toLowerCase())
      .includes(subject.toLowerCase());
  });

  console.log(results);
  const allBooks = results.map((book) => {
    return <Books key={book.id} book={book} modalType="library" />;
  });

  return allBooks;
};

export default useExplore;
