import styled from "styled-components";

interface Props {
  onClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  buttonType?: "action";
}

const ButtonBase = styled.button`
  font-size: 1rem;
  padding: 6px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;

const StyledPrimaryButton = styled(ButtonBase)`
  background-color: var(--primary);
  color: var(--neutral-primary);
  border: 1px solid var(--primary);

  &:hover {
    background-color: var(--primary-hover);
    border: 1px solid var(--primary-hover);
  }
`;

const StyledActionButton = styled(ButtonBase)`
  padding: 10px 20px;
  background-color: var(--neutral-primary);
  color: var(--secondary);
  border-radius: 5px;
  border: 1px solid var(--secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: var(--secondary);
    color: var(--neutral-primary);
  }
`;

const Button = (props: Props) => {
  const { onClick, type, children, buttonType } = props;

  const handleButtonClick = () => onClick();

  if (buttonType === "action") {
    return (
      <StyledActionButton onClick={handleButtonClick}>
        {children}
      </StyledActionButton>
    );
  }

  return (
    <StyledPrimaryButton type={type} onClick={handleButtonClick}>
      {children}
    </StyledPrimaryButton>
  );
};

export default Button;
