import { styled } from "styled-components";
import { removeShelf } from "../../store/features/shelf/shelfSlice";
import { useAppDispatch } from "../../store/hooks/hooks";
import { StyledButtonGroup } from "../../styles/StyledButtonGroup";
import Button from "../helpers/ui/Button";

const StyledShelf = styled.div`
  article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
    gap: 0.8rem;
    max-width: 380px;
    margin: 0 auto;
  }

  .title {
    font-size: 1.2rem;
    color: var(--secondary);
    width: calc(100% - 2rem);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-family: "Rubik", sans-serif;
    font-weight: bold;
  }

  p {
    padding-bottom: 0.5rem;

    span {
      color: var(--primary);
    }
  }
`;

type Props = {
  closeModal: () => void;
  shelfName: string;
  activeFilter: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
};

const RemoveShelf = (props: Props) => {
  const { closeModal, shelfName, activeFilter, setActiveFilter } = props;
  const dispatch = useAppDispatch();

  const deleteShelf = () => {
    if (activeFilter === shelfName) setActiveFilter("All");
    dispatch(removeShelf(shelfName));
    closeModal();
  };

  return (
    <StyledShelf>
      <article>
        <h1 className="title">Delete Shelf</h1>
        <p>
          Are you want to delete your
          <span> {shelfName} </span>
          shelf? This will remove it and all the books on this shelf.
        </p>
      </article>

      <StyledButtonGroup>
        <Button buttonType="action" onClick={closeModal}>
          Cancel
        </Button>
        <Button buttonType="action" onClick={deleteShelf}>
          Delete
        </Button>
      </StyledButtonGroup>
    </StyledShelf>
  );
};

export default RemoveShelf;
