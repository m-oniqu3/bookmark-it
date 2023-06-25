import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const StyledSearchBar = styled.form`
  position: relative;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    border: 1.2px solid var(--primary);
    border-radius: 5px;
    padding: 7px 15px;
    color: var(--primary);
    width: 100%;
    font-size: 0.9rem;
    font-weight: 400;

    &:focus {
      outline: none;
      text-align: left;
    }

    &::placeholder {
      color: var(--primary);
      opacity: 1;
      font-weight: 300;
    }
  }
`;

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/search/${query}`);
  };

  return (
    <StyledSearchBar onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Search bookmark"
        value={query}
        onChange={(e) => handleQuery(e)}
      />
    </StyledSearchBar>
  );
};

export default SearchBar;
