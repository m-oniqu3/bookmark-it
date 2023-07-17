import { MouseEvent, useState } from "react";
import { styled } from "styled-components";
import { createShelf, removeShelf } from "../../store/features/shelf/shelfSlice";
import { useAppDispatch } from "../../store/hooks/hooks";
import { PopoverEnum, RenameShelfPopover } from "../../types/PopoverType";
import Popover from "../helpers/ui/Popover";
import BaseShelfPopover from "./BaseShelfPopover";

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
  offset: { x: number; y: number };
};

const ShelfOptions = (props: Props) => {
  const { shelf, activeFilter, setActiveFilter, closePopover, offset } = props;
  const dispatch = useAppDispatch();
  //   const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activePopover, setActivePopover] = useState<RenameShelfPopover | null>(null);

  const handleDelete = () => {
    if (activeFilter === shelf) setActiveFilter("All");
    dispatch(removeShelf(shelf));

    closePopover();
  };

  const handleRename = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // setOffset({ x: e.clientX, y: e.clientY });
    setActivePopover({
      type: PopoverEnum.RENAME_SHELF_POPOVER,
      title: "Rename Shelf",
      text: "Enter a new name.",
      submitFn: createShelf,
      shelfName: shelf,
    });

    // closePopover();
  };

  return (
    <>
      <StyledShelfOptions>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleRename}>Rename</button>
      </StyledShelfOptions>

      {activePopover && (
        <Popover offsets={offset} closePopover={() => setActivePopover(null)}>
          <BaseShelfPopover content={activePopover} closePopover={() => setActivePopover(null)} />
        </Popover>
      )}
    </>
  );
};

export default ShelfOptions;
