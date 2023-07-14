import { styled } from "styled-components";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";

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
  const userShelves = tempShelves.map((shelf) => (
    <div className="shelf">
      <p>{shelf}</p>
    </div>
  ));

  return (
    <StyledShelf>
      <div className="created-shelves">
        <Button onClick={() => console.log("click")}>New Shelf</Button>

        <> {userShelves}</>
      </div>
    </StyledShelf>
  );
};

export default Shelf;
