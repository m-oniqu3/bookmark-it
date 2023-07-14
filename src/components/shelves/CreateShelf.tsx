import { styled } from "styled-components";
import { StyledButtonGroup } from "../../styles/StyledButtonGroup";
import { StyledText } from "../../styles/StyledText";
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
    width: 100%;
    max-width: 350px;
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
  const { closeModal } = props;
  return (
    <StyledShelf>
      <div className="header">
        <Heading variant="small" text="Create New Shelf" />
        <StyledText> Get creative and place the books in your library in custom shelves.</StyledText>
      </div>

      <form>
        <input type="text" placeholder="Eg. My Mafia Faves" required maxLength={40} autoFocus />
      </form>

      <StyledButtonGroup>
        <Button buttonType="action" onClick={closeModal}>
          Cancel
        </Button>
        <Button buttonType="action" onClick={() => console.log("click")}>
          Create Shelf
        </Button>
      </StyledButtonGroup>
    </StyledShelf>
  );
};

export default CreateShelf;
