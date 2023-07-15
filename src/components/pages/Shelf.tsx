import { Fragment, useState } from "react";
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
  // const { library } = useAppSelector((state) => state.bookStore);
  // const isLibraryEmpty = Object.keys(library).length === 0;
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const results = useFilterShelf(activeFilter);

  const handleShelf = () => {
    setActiveModal({ type: ModalEnum.CREATE_SHELF_MODAL });
  };

  const sortedShelves: string[] = Object.entries(shelves)
    .sort((a, b) => b[1].createdAt - a[1].createdAt)
    .map((shelf) => shelf["0"]);

  const handleFilter = (filter: string) => setActiveFilter(filter);

  const renderShelves = ["All"].concat(sortedShelves).map((shelf) => {
    return (
      <div className="shelf" key={shelf}>
        <p onClick={() => handleFilter(shelf)}>{shelf}</p>
      </div>
    );
  });

  // if (isLibraryEmpty) {
  //   return (
  //     <Empty
  //       src={shelves}
  //       route="/explore"
  //       heading="Your shelves are empty"
  //       message="Search for a book to add it to your library to start populating your shelves."
  //       buttonName="Explore"
  //       adjust={true}
  //     />
  //   );
  // }

  const content = (() => {
    if (results.length > 0) {
      return <StyledGrid>{results}</StyledGrid>;
    }

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
  })();

  return (
    <>
      <StyledShelf>
        <div className="created-shelves">
          <Button onClick={handleShelf}>New Shelf</Button>

          <> {renderShelves}</>
        </div>

        <Fragment>{content}</Fragment>
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
