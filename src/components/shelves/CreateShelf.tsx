import { FormEvent, useState } from "react";
import { styled } from "styled-components";
import { createShelf } from "../../store/features/shelf/shelfSlice";
import { useAppDispatch } from "../../store/hooks/hooks";
import { StyledButtonGroup } from "../../styles/StyledButtonGroup";
import Button from "../helpers/ui/Button";
import Heading from "../helpers/ui/Heading";

const StyledShelf = styled.div`
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-align: center;
    max-width: 350px;
    margin: 0 auto;

    h1 {
      font-size: clamp(1.2rem, 6vw, 1.5rem);
    }
  }

  form {
    padding: 1rem 0;
    width: min(80%, 350px);
    margin: 0 auto;

    input {
      border: none;
      border-bottom: 1px solid var(--neutral-medium);
      padding: 0.5rem;
      text-align: center;
      display: block;
      outline: none;
      width: 100%;
      font-size: 0.9rem;
    }
  }
`;

type Props = {
  closeModal: () => void;
};

const CreateShelf = (props: Props) => {
  const [shelfName, setShelfName] = useState<string>("");
  const dispatch = useAppDispatch();
  const { closeModal } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShelfName(e.target.value);
  };

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    console.log(shelfName);

    dispatch(createShelf(shelfName.trim()));
    closeModal();
  };

  return (
    <StyledShelf>
      <div className="header">
        <Heading variant="small" text="Create New Shelf" />
        <p> Get creative and place the books in your library in custom shelves.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Eg. My Mafia Faves"
          required
          maxLength={40}
          autoFocus
          value={shelfName}
          onChange={handleChange}
        />
      </form>

      <StyledButtonGroup>
        <Button buttonType="action" onClick={closeModal}>
          Cancel
        </Button>
        <Button buttonType="action" onClick={handleSubmit}>
          Create Shelf
        </Button>
      </StyledButtonGroup>
    </StyledShelf>
  );
};

export default CreateShelf;
