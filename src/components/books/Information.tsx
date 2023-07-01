import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { StyledButtonGroup } from "../../styles/StyledButtonGroup";
import { devices } from "../../styles/breakpoints";
import { Book } from "../../types/Book";
import { ModalEnum, ModalType } from "../../types/ModalType";
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
  setActiveModal: (modal: ModalType | null) => void;
};

const Information = (props: Props) => {
  const navigate = useNavigate();
  const { book, modalType, setActiveModal } = props;

  const text = modalType === "library" ? "Library" : "Shelf";

  const handleAdd = () => {
    switch (modalType) {
      case "library":
        setActiveModal({ type: ModalEnum.ADD_TO_LIBRARY_MODAL, book });
        break;

      default:
        setActiveModal({ type: ModalEnum.ADD_TO_LIBRARY_MODAL, book });
    }
  };

  const handleDetails = () => {
    navigate(`/details/${book.id}`);
  };

  return (
    <StyledInfo>
      <Summary book={book} />

      <StyledButtonGroup>
        <Button buttonType="action" onClick={handleAdd}>
          Add to {text}
        </Button>
        <Button buttonType="action" onClick={handleDetails}>
          Details & More
        </Button>
      </StyledButtonGroup>
    </StyledInfo>
  );
};

export default Information;
