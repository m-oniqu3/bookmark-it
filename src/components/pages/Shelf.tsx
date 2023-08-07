import { Fragment, MouseEvent, useEffect, useState } from "react";
import { GrMoreVertical } from "react-icons/gr";
import { styled } from "styled-components";
import shelvesImage from "../../assets/shelves.svg";
import useFilterShelf from "../../hooks/useFilterShelf";
import { useAppSelector } from "../../store/hooks/hooks";
import { StyledGrid } from "../../styles/StyledGrid";
import { StyledTitle } from "../../styles/StyledTitle";
import { devices } from "../../styles/breakpoints";
import { PopoverEnum, PopoverType } from "../../types/PopoverType";
import { SmallModalEnum, SmallModalTypes } from "../../types/SmallModalTypes";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Empty from "../helpers/ui/Empty";
import Popover from "../helpers/ui/Popover";
import { SmallModal } from "../helpers/ui/SmallModal";
import CreateShelf from "../shelves/CreateShelf";
import ShelfOptions from "../shelves/ShelfOptions";
import { parseColor } from "../utils/parseColor";

const StyledShelf = styled(Container)`
  padding: 1.5rem 0;

  @media (${devices.large}) {
    display: grid;
    grid-template-columns: 1fr 15.5rem;
    gap: 3rem;

    .options {
      order: 1;
    }
  }

  .options {
    display: flex;
    flex-direction: column;
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

    .shelves {
      display: flex;
      gap: 1rem;
      width: 100%;
      overflow-x: scroll;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }

      @media (${devices.large}) {
        flex-wrap: wrap;
      }
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

    .authors {
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
      }

      .author {
        padding: 7px 12px;
        border-radius: 5px;
        text-transform: capitalize;
        font-size: 0.9rem;
        font-weight: 500;
        color: #1a1a1a;
        min-width: fit-content;
        cursor: pointer;
        height: 31px;

        &.active {
          background-color: var(--secondary) !important;
          color: var(--neutral-primary) !important;
        }
      }
    }
  }
`;

const Shelf = () => {
  const { shelves } = useAppSelector((state) => state.bookShelf);
  const { library } = useAppSelector((state) => state.bookStore);
  const colors = useAppSelector((state) => state.colours.bookColours);
  const isLibraryEmpty = Object.keys(library).length === 0;
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activePopover, setActivePopover] = useState<PopoverType | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeShelfModal, setActiveShelfModal] = useState<SmallModalTypes | null>(null);
  const [activeAuthor, setActiveAuthor] = useState<string>("All");

  const { authors, books } = useFilterShelf(activeFilter, activeAuthor);

  const handleFilter = (filter: string) => setActiveFilter(filter);

  const handleNewShelf = () => {
    setActiveShelfModal({ type: SmallModalEnum.NEW_SHELF_MODAL });
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

  const handleAuthor = (author: string) => {
    setActiveAuthor(author);

    //smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const authorColours = Object.values(colors).slice(0, authors.length + 1);

  useEffect(() => {
    if (!authors.includes(activeAuthor)) {
      setActiveAuthor("All");
    }
  }, [authors, activeAuthor]);

  const authorList = ["All"].concat(authors).map((author, i) => {
    const active = activeAuthor === author ? "active" : "";
    const background = `rgba(${parseColor(authorColours[i])}, 0.5)`;

    return (
      <div
        key={author}
        className={`author ${active}`}
        onClick={() => handleAuthor(author)}
        style={{ backgroundColor: background }}
      >
        {author}
      </div>
    );
  });

  const popoverContent = (() => {
    switch (activePopover?.type) {
      case PopoverEnum.SHELF_MENU_POPOVER:
        return (
          <ShelfOptions
            shelf={activePopover.name}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            closePopover={() => setActivePopover(null)}
          />
        );

      default:
        return null;
    }
  })();

  const content = (() => {
    if (books.length > 0) {
      return <StyledGrid>{books}</StyledGrid>;
    }

    return (
      <Empty
        src={shelvesImage}
        route="/explore/picks/all"
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
        route="/explore/picks/all"
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
        <div className="options">
          <div>
            <StyledTitle className="title">Shelves</StyledTitle>
            <div className="shelves">
              <Button onClick={handleNewShelf}>New Shelf</Button>

              <Fragment> {renderShelves}</Fragment>
            </div>
          </div>

          {authorList.length > 1 && (
            <div>
              <StyledTitle className="title">Authors</StyledTitle>
              <div className="authors">{authorList}</div>
            </div>
          )}
        </div>

        <Fragment>{content}</Fragment>
      </StyledShelf>

      {activePopover && (
        <Popover offsets={offset} closePopover={() => setActivePopover(null)}>
          {popoverContent}
        </Popover>
      )}

      {activeShelfModal && (
        <SmallModal closeModal={() => setActiveShelfModal(null)}>
          <CreateShelf closeModal={() => setActiveShelfModal(null)} />
        </SmallModal>
      )}
    </>
  );
};

export default Shelf;
