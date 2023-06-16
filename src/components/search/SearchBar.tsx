import { styled } from "styled-components";

const StyledSearchBar = styled.form`
  position: relative;

  input {
    border: 1.5px solid var(--primary);
    border-radius: 5px;
    padding: 6px 15px;
    color: var(--primary);
    width: 100%;
    font-size: 1rem;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--primary);
      opacity: 1;
      text-align: center;
    }
  }
`;

const SearchBar = () => {
  return (
    <StyledSearchBar>
      <input type="text" placeholder="Search bookmark" />
    </StyledSearchBar>
  );
};

export default SearchBar;
