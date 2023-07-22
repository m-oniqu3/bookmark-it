import { useEffect } from "react";
import { styled } from "styled-components";
import { addToLibrary, getActiveBookCategory } from "../../store/features/library/librarySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { devices } from "../../styles/breakpoints";
import { Book, BookCategory } from "../../types/Book";

const StyledOptions = styled.div`
  width: min(100%, 300px);

  .categories {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    width: 100%;
    padding: 1rem 0;

    @media (${devices.large}) {
      margin-left: auto;
      grid-template-columns: 1fr;
      width: 169.594px;
    }

    .category {
      padding: 7px 4px;
      border: 1px solid var(--neutral-light);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      min-width: fit-content;
      width: 100%;
      transition: all 0.3s ease-in-out;

      &:hover {
        border: 1px solid var(--secondary);
        border-radius: 5px;
        cursor: pointer;
      }

      &__active {
        background-color: var(--secondary);
        color: var(--neutral-primary);
      }
    }
  }
`;

const categories: BookCategory[] = ["TBR", "Reading", "Finished", "DNF"];

type Props = {
  book: Book;
  closeOptions: () => void;
};

const Options = (props: Props) => {
  const dispatch = useAppDispatch();
  const duplicateBookCategory = useAppSelector((state) => state.bookStore.duplicateBookCategory);
  const { book, closeOptions } = props;

  const handleCategoryClick = (category: BookCategory) => {
    const now = Date.now();

    dispatch(addToLibrary({ bookInfo: book, category, timeAdded: now }));
    closeOptions();
  };

  useEffect(() => {
    dispatch(getActiveBookCategory(book.id));
  }, [book.id, dispatch]);

  const renderCategories = categories.map((category) => {
    const active = duplicateBookCategory === category ? "category__active" : "";
    return (
      <p key={category} className={`category ${active}`} onClick={() => handleCategoryClick(category)}>
        {category}
      </p>
    );
  });

  return (
    <StyledOptions>
      <div className="categories">{renderCategories}</div>
    </StyledOptions>
  );
};

export default Options;
