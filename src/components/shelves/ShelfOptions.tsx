import { styled } from "styled-components";
import { removeShelf } from "../../store/features/shelf/shelfSlice";
import { useAppDispatch } from "../../store/hooks/hooks";

const StyledShelfOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  button {
    font-size: 0.9rem;
    padding: 7px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: none;

    &:hover {
      background-color: var(--secondary);
      color: var(--neutral-primary);
    }
  }
`;

type Props = {
  shelf: string;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  closePopover: () => void;
};

const ShelfOptions = (props: Props) => {
  const { shelf, activeFilter, setActiveFilter, closePopover } = props;
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (activeFilter === shelf) setActiveFilter("All");
    dispatch(removeShelf(shelf));

    closePopover();
  };

  return (
    <StyledShelfOptions>
      <button onClick={handleDelete}>Delete Shelf</button>
      <button>Rename Shelf</button>
    </StyledShelfOptions>
  );
};

export default ShelfOptions;
