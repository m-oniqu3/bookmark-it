import { Fragment, MouseEvent, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { styled } from "styled-components";
import shelvesImage from "../../assets/shelves.svg";
import useFilterShelf from "../../hooks/useFilterShelf";
import { createShelf, removeShelf } from "../../store/features/shelf/shelfSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { StyledGrid } from "../../styles/StyledGrid";
import { devices } from "../../styles/breakpoints";
import { PopoverEnum, PopoverType } from "../../types/PopoverType";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Empty from "../helpers/ui/Empty";
import Popover from "../helpers/ui/Popover";
import BaseShelfPopover from "../shelves/BaseShelfPopover";

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
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activePopover, setActivePopover] = useState<PopoverType | null>(null);
  const dispatch = useAppDispatch();
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const results = useFilterShelf(activeFilter);
  const handleFilter = (filter: string) => setActiveFilter(filter);

  const handleNewShelf = (e: MouseEvent<HTMLButtonElement>) => {
    setOffset({ x: e.clientX, y: e.clientY });
    setActivePopover({
      type: PopoverEnum.NEW_SHELF_POPOVER,
      title: "Create Shelf",
      text: "Create a shelf to organize your books.",
      submitFn: createShelf,
    });
  };

  // const handleRemoveShelf = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, name: string) => {
  //   e.stopPropagation();
  //   setActivePopover({ type: PopoverEnum.DELETE_POPOVER, name });
  //   setOffset({ x: e.pageX, y: e.pageY });
  // };

  const deleteShelf = () => {
    if (activePopover?.type === PopoverEnum.SHELF_MENU_POPOVER) {
      const shelf = activePopover.name;
      if (activeFilter === shelf) setActiveFilter("All");
      dispatch(removeShelf(shelf));
    }

    setActivePopover(null);
  };

  const sortedShelves: string[] = Object.entries(shelves)
    .sort((a, b) => b[1].createdAt - a[1].createdAt)
    .map((shelf) => shelf["0"]);

  const renderShelves = ["All"].concat(sortedShelves).map((shelf) => {
    const active = activeFilter === shelf ? "active" : "";
    return (
      <div className={`shelf ${active}`} key={shelf} onClick={() => handleFilter(shelf)}>
        <p className="shelf__name">
          <Fragment>{shelf}</Fragment>

          {shelf !== "All" && (
            <span>
              <IoIosMore size={20} />
            </span>
          )}
        </p>
      </div>
    );
  });

  const popoverContent = (() => {
    switch (activePopover?.type) {
      case PopoverEnum.NEW_SHELF_POPOVER:
        return <BaseShelfPopover content={activePopover} closePopover={() => setActivePopover(null)} />;

      case PopoverEnum.SHELF_MENU_POPOVER:
        return <button onClick={deleteShelf}>Delete</button>;

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

  // if (isLibraryEmpty) {
  //   return (
  //     <Empty
  //       src={shelvesImage}
  //       route="/explore"
  //       heading="Your shelves are empty"
  //       message="Search for a book to add it to your library to start populating your shelves."
  //       buttonName="Explore"
  //       adjust={true}
  //     />
  //   );
  // }

  return (
    <>
      <StyledShelf>
        <div className="created-shelves">
          <Button onClick={(e: MouseEvent<HTMLButtonElement>) => handleNewShelf(e)}>New Shelf</Button>

          <> {renderShelves}</>
        </div>

        <Fragment>{content}</Fragment>
      </StyledShelf>

      {activePopover && (
        <Popover offsets={offset} closePopover={() => setActivePopover(null)}>
          {popoverContent}
        </Popover>
      )}
    </>
  );
};

export default Shelf;
