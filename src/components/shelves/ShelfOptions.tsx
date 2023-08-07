import { MouseEvent, useState } from "react";
import { styled } from "styled-components";
import { removeShelf } from "../../store/features/shelf/shelfSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { SmallModalEnum, SmallModalTypes } from "../../types/SmallModalTypes";
import { SmallModal } from "../helpers/ui/SmallModal";
import RenameShelf from "./RenameShelf";

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
    color: var(--secondary);

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
  const { user } = useAppSelector((state) => state.auth);
  const { shelf, activeFilter, setActiveFilter, closePopover } = props;
  const dispatch = useAppDispatch();
  const [activeShelfModal, setActiveShelfModal] = useState<SmallModalTypes | null>(null);

  const handleDelete = () => {
    if (activeFilter === shelf) setActiveFilter("All");
    if (user) {
      dispatch(removeShelf({ selectedShelf: shelf, user }));
    }

    closePopover();
  };

  const handleRename = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setActiveShelfModal({ type: SmallModalEnum.RENAME_SHELF_MODAL, currentShelf: shelf });
  };

  const closeModal = () => setActiveShelfModal(null);

  return (
    <>
      <StyledShelfOptions>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleRename}>Rename</button>
      </StyledShelfOptions>

      {activeShelfModal && activeShelfModal.type === SmallModalEnum.RENAME_SHELF_MODAL && (
        <SmallModal closeModal={closeModal}>
          <RenameShelf
            closePopover={closePopover}
            closeModal={closeModal}
            currentShelf={activeShelfModal.currentShelf}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </SmallModal>
      )}
    </>
  );
};

export default ShelfOptions;
