import { Book } from "../../types/Book";
import Summary from "./Summary";

type Props = {
  book: Book;
  modalType: "library" | "shelf";
};

const Information = (props: Props) => {
  const { book } = props;

  return (
    <div>
      <Summary book={book} />
    </div>
  );
};

export default Information;
