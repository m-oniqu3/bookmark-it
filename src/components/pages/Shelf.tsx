import { useState } from "react";
import { styled } from "styled-components";
import shelves from "../../assets/shelves.svg";
import { useAppSelector } from "../../store/hooks/hooks";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Empty from "../helpers/ui/Empty";
import Modal from "../helpers/ui/Modal";
import CreateShelf from "../shelves/CreateShelf";

const StyledShelf = styled(Container)`
  padding: 1.5rem 0;

  .created-shelves {
    display: flex;
    gap: 1rem;
    width: 100%;
    overflow-x: scroll;
    scrollbar-width: none;
    padding-bottom: 1rem;

    &::-webkit-scrollbar {
      display: none;
    }

    .shelf {
      padding: 7px 12px;
      border-radius: 5px;
      text-transform: capitalize;
      font-size: 0.9rem;
      font-weight: 500;
      color: #1a1a1a;
      min-width: fit-content;
      background-color: var(--neutral-light);
      cursor: pointer;
      height: 31px;
    }

    button {
      padding: 7px 12px;
      font-size: 0.9rem;
      font-weight: 500;
      min-width: fit-content;
      height: 31px;
    }
  }
`;

const tempShelves = ["All", "Romance", "Mystery", "Humor", "Fantasy", "Horror"];

const Shelf = () => {
  const { library } = useAppSelector((state) => state.bookStore);
  const isLibraryEmpty = Object.keys(library).length === 0;
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const handleShelf = () => {
    setActiveModal({ type: ModalEnum.CREATE_SHELF_MODAL });
  };

  const userShelves = tempShelves.map((shelf) => (
    <div className="shelf">
      <p>{shelf}</p>
    </div>
  ));

  if (isLibraryEmpty) {
    return (
      <Empty
        src={shelves}
        route="/explore"
        heading="Your shelves are empty"
        message="Search for a book to add it to your library to start populating your shelves."
        buttonName="Explore"
        adjust={true}
      />
    );
  }

  return (
    <>
      <StyledShelf>
        <div className="created-shelves">
          <Button onClick={handleShelf}>New Shelf</Button>

          <> {userShelves}</>
        </div>
      </StyledShelf>

      {activeModal && (
        <Modal closeModal={() => setActiveModal(null)}>
          <CreateShelf closeModal={() => setActiveModal(null)} />
        </Modal>
      )}
    </>
  );
};

export default Shelf;
