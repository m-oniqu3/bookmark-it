import type { Book } from "../../types/Book";

type Props = {
  book: Book;
  modalType: "library" | "shelf";
};

const Books = (props: Props) => {
  const { book, modalType } = props;
  return <div>{book.title}</div>;
};

export default Books;
