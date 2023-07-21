import { ChangeEvent, FormEvent, useState } from "react";
import { styled } from "styled-components";
import { useAppDispatch } from "../../store/hooks/hooks";
import { StyledText } from "../../styles/StyledText";

const StyledRenameShelf = styled.div`
  width: 250px;
  padding: 0.2rem;

  .title {
    font-size: 1rem;
    font-weight: 400;
    padding-bottom: 0.2rem;
  }

  p {
    font-size: 0.9rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;

    .content {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 1rem;

      label {
        font-weight: 300;
        font-size: 0.9rem;
        margin: auto 0;
      }

      input {
        padding: 0.3rem 0.5rem;
        border: 1px solid gainsboro;
        border-radius: 5px;

        &:focus {
          outline: none;
        }
      }
    }
  }

  button {
    width: 100%;
    font-size: 0.9rem;
    padding: 7px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: none;

    &:hover {
      background-color: var(--secondary);
      color: var(--neutral-primary);
    }
  }
`;

type Props = {
  closePopover: () => void;
  currentShelf: string;
};

const RenameShelf = (props: Props) => {
  const { closePopover, currentShelf } = props;
  const [name, setName] = useState(currentShelf);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    closePopover();
  };

  return (
    <StyledRenameShelf onClick={(e) => handleClick(e)}>
      <p className="title">Create Shelf</p>
      <StyledText>Create a shelf to organize your books.</StyledText>

      <form onSubmit={handleSubmit}>
        <div className="content">
          <label>Name</label>
          <input type="text" required maxLength={40} autoFocus value={name} onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </StyledRenameShelf>
  );
};

export default RenameShelf;
