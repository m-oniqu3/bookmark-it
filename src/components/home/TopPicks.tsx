import { Fragment } from "react";
import { styled } from "styled-components";
import useExplore from "../../hooks/useExplore";
import { StyledText } from "../../styles/StyledText";
import { devices } from "../../styles/breakpoints";
import Container from "../helpers/ui/Container";
import Heading from "../helpers/ui/Heading";

const StyledPicks = styled.div`
  padding: 3rem 0;

  @media (${devices.medium}) {
    padding: 4rem 0;
  }

  @media (${devices.large}) {
    height: 90vh;
  }

  article {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1rem;

    max-width: 550px;
    margin: 0 auto;
  }

  .picks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(105px, 1fr));
    gap: 1rem;
    place-items: center;
    width: min(80%, 1000px);
    margin: 2rem auto;

    @media (${devices.medium}) {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin: 3rem auto;
    }

    @media (${devices.semiLarge}) {
      gap: 3rem;
      width: min(100%, 1200px);
    }

    @media (${devices.xlarge}) {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 3rem;
      width: min(100%, 1200px);
    }
  }
`;

type Props = {
  heading: string;
  paragraph: string;
};

const TopPicks = (props: Props) => {
  const picks = useExplore("easy reads");
  const limitedPicks = picks.slice(0, 6);
  const { heading, paragraph } = props;

  return (
    <StyledPicks>
      <Container>
        <article>
          <Heading variant="medium" text={heading} />
          <StyledText>{paragraph}</StyledText>
        </article>

        <div className="picks">
          <Fragment>{limitedPicks}</Fragment>
        </div>
      </Container>
    </StyledPicks>
  );
};

export default TopPicks;
