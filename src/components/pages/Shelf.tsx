import { Fragment, MouseEvent, useState } from "react";
import { GrMoreVertical } from "react-icons/gr";
import { styled } from "styled-components";
import shelvesImage from "../../assets/shelves.svg";
import useFilterShelf from "../../hooks/useFilterShelf";
import { useAppSelector } from "../../store/hooks/hooks";
import { StyledGrid } from "../../styles/StyledGrid";
import { devices } from "../../styles/breakpoints";
import { PopoverEnum, PopoverType } from "../../types/PopoverType";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Empty from "../helpers/ui/Empty";
import Popover from "../helpers/ui/Popover";
import CreateShelf from "../shelves/CreateShelf";
import ShelfOptions from "../shelves/ShelfOptions";

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
        gap: 0.5rem;
        height: 100%;

        span {
          padding: 2px;
          border-radius: 2px;
          transition: all 0.3s ease-in-out;

          &:hover {
            background-color: #d2d2d2;
          }
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
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const results = useFilterShelf(activeFilter);

  console.log(activePopover, offset);

  const handleFilter = (filter: string) => setActiveFilter(filter);

  const handleNewShelf = (e: MouseEvent<HTMLButtonElement>) => {
    setOffset({ x: e.clientX, y: e.clientY });
    setActivePopover({
      type: PopoverEnum.NEW_SHELF_POPOVER,
    });
  };

  const handleShelfMenu = (e: MouseEvent<HTMLSpanElement>, name: string) => {
    e.stopPropagation();
    setActivePopover({ type: PopoverEnum.SHELF_MENU_POPOVER, name });
    setOffset({ x: e.clientX, y: e.clientY });
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
            <span onClick={(e) => handleShelfMenu(e, shelf)}>
              <GrMoreVertical size={12} />
            </span>
          )}
        </p>
      </div>
    );
  });

  const popoverContent = (() => {
    switch (activePopover?.type) {
      case PopoverEnum.NEW_SHELF_POPOVER:
        return <CreateShelf closePopover={() => setActivePopover(null)} />;

      case PopoverEnum.SHELF_MENU_POPOVER:
        return (
          <ShelfOptions
            shelf={activePopover.name}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            closePopover={() => setActivePopover(null)}
            offset={offset}
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
