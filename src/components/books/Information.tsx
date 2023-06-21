import { styled } from "styled-components";
import { devices } from "../../styles/breakpoints";
import { Book } from "../../types/Book";
import Button from "../helpers/ui/Button";
import Summary from "./Summary";

const StyledInfo = styled.div`
  .button-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1rem 0 0;
    gap: 0.4rem;

    @media (${devices.medium}) {
      gap: 1rem;
    }

    button {
      padding: 8px 10px;

      @media (${devices.medium}) {
        padding: 8px 20px;
      }
    }
  }
`;

type Props = {
  book: Book;
  modalType: "library" | "shelf";
};

const Information = (props: Props) => {
  const { book, modalType } = props;

  const text = modalType === "library" ? "Library" : "Shelf";

  return (
    <StyledInfo>
      <Summary book={book} />
      <div className="button-group">
        <Button buttonType="action" onClick={() => console.log("v")}>
          Add to {text}
        </Button>
        <Button buttonType="action" onClick={() => console.log("v")}>
          Details & More
        </Button>
      </div>
    </StyledInfo>
  );
};

export default Information;
