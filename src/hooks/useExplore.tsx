import Books from "../components/books/Books";
import { exploreBooks } from "../components/utils/exploreBooks";

const useExplore = (subject: string) => {
  console.log(subject);
  const results = (() => {
    if (subject === "all") {
      return exploreBooks;
    }

    return exploreBooks.filter((book) => {
      return book.subject.map((subject) => subject.toLowerCase()).includes(subject.toLowerCase());
    });
  })();

  const allBooks = results.map((book) => {
    return <Books key={book.id} book={book} modalType="library" showBookmarkIcon={true} />;
  });

  return allBooks;
};

export default useExplore;
