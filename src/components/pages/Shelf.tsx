import { Fragment, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { styled } from "styled-components";
import shelvesImage from "../../assets/shelves.svg";
import useFilterShelf from "../../hooks/useFilterShelf";
import { useAppSelector } from "../../store/hooks/hooks";
import { StyledGrid } from "../../styles/StyledGrid";
import { devices } from "../../styles/breakpoints";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Empty from "../helpers/ui/Empty";
import Modal from "../helpers/ui/Modal";
import CreateShelf from "../shelves/CreateShelf";
import RemoveShelf from "../shelves/RemoveShelf";

const StyledShelf = styled(Container)`
  padding: 1.5rem 0;

  @media (${devices.large}) {
    display: grid;
    grid-template-columns: 1fr 15.5rem;
    gap: 3rem;

    .created-shelves {
      order: 1;
    }
  }

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

    @media (${devices.large}) {
      flex-wrap: wrap;
      position: sticky;
      top: 12vh;
      height: fit-content;
    }

    .shelf {
      padding: 7px 12px;
      border-radius: 5px;
      font-size: 0.9rem;
      font-weight: 500;
      color: #1a1a1a;
      min-width: fit-content;
      background-color: var(--neutral-light);
      cursor: pointer;
      height: 31px;

      &.active {
        background-color: var(--secondary);
        color: var(--neutral-primary);
      }

      &__name {
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        span {
          svg {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
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

const Shelf = () => {
  const { shelves } = useAppSelector((state) => state.bookShelf);
  const { library } = useAppSelector((state) => state.bookStore);
  const isLibraryEmpty = Object.keys(library).length === 0;
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const results = useFilterShelf(activeFilter);
  const handleFilter = (filter: string) => setActiveFilter(filter);

  const handleNewShelf = () => {
    setActiveModal({ type: ModalEnum.CREATE_SHELF_MODAL });
  };

  const handleRemoveShelf = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, name: string) => {
    e.stopPropagation();
    setActiveModal({ type: ModalEnum.REMOVE_SHELF_MODAL, shelfName: name });
  };

  const sortedShelves: string[] = Object.entries(shelves)
    .sort((a, b) => b[1].createdAt - a[1].createdAt)
    .map((shelf) => shelf["0"]);

  const renderShelves = ["All"].concat(sortedShelves).map((shelf) => {
    const active = activeFilter === shelf ? "active" : "";
    return (
      <div className={`shelf ${active}`} key={shelf} onClick={() => handleFilter(shelf)}>
        <p className="shelf__name">
          <>{shelf}</>

          {shelf !== "All" && (
            <span onClick={(e) => handleRemoveShelf(e, shelf)}>
              <IoIosClose size={20} />
            </span>
          )}
        </p>
      </div>
    );
  });

  const modalContent = (() => {
    switch (activeModal?.type) {
      case ModalEnum.CREATE_SHELF_MODAL:
        return <CreateShelf closeModal={() => setActiveModal(null)} />;
      case ModalEnum.REMOVE_SHELF_MODAL:
        return (
          <RemoveShelf
            closeModal={() => setActiveModal(null)}
            shelfName={activeModal.shelfName}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
        );
      default:
        return null;
    }
  })();

  const content = (() => {
    if (results.length > 0) {
      return <StyledGrid>{results}</StyledGrid>;
    }

    return (
      <Empty
        src={shelvesImage}
        route="/explore"
        heading="No books here yet"
        message="Search for a book to add it to your library to start populating your shelves."
        buttonName="Explore"
        adjust={true}
      />
    );
  })();

  if (isLibraryEmpty) {
    return (
      <Empty
        src={shelvesImage}
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
          <Button onClick={handleNewShelf}>New Shelf</Button>

          <> {renderShelves}</>
        </div>

        <Fragment>{content}</Fragment>
      </StyledShelf>

      {activeModal && <Modal closeModal={() => setActiveModal(null)}>{modalContent}</Modal>}
    </>
  );
};

export default Shelf;
