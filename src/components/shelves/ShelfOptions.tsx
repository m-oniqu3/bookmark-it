import { Dispatch, MouseEvent, SetStateAction } from "react";
import { styled } from "styled-components";
import { createShelf, removeShelf } from "../../store/features/shelf/shelfSlice";
import { useAppDispatch } from "../../store/hooks/hooks";
import { PopoverEnum, PopoverType } from "../../types/PopoverType";

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
    /* min-width: max-content; */

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
  setOffset: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setActivePopover: Dispatch<SetStateAction<PopoverType | null>>;
};

const ShelfOptions = (props: Props) => {
  const { shelf, activeFilter, setActiveFilter, closePopover, setActivePopover, setOffset } = props;
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (activeFilter === shelf) setActiveFilter("All");
    dispatch(removeShelf(shelf));

    closePopover();
  };

  const handleRename = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOffset({ x: e.clientX, y: e.clientY });
    setActivePopover({
      type: PopoverEnum.RENAME_SHELF_POPOVER,
      title: "Rename Shelf",
      text: "Enter a new name.",
      submitFn: createShelf,
      shelfName: shelf,
    });
  };

  return (
    <>
      <StyledShelfOptions>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleRename}>Rename</button>
      </StyledShelfOptions>
    </>
  );
};

export default ShelfOptions;
