import { styled } from "styled-components";
import banner from "../../assets/banner.jpg";
import { StyledText } from "../../styles/StyledText";
import { devices } from "../../styles/breakpoints";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Heading from "../helpers/ui/Heading";

const StyledBookTok = styled.div`
  background-image: url("../../assets/text-bg.png");
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;

  .banner {
    height: 40%;

    @media (${devices.medium}) {
      height: 250px;
      width: 100%;
    }

    @media (${devices.large}) {
      width: 85%;
      margin: 0 auto;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  article {
    padding: 5rem 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    max-width: 500px;
    margin: 0 auto;

    p {
      max-width: 460px;
      margin: 0 auto;
    }

    @media (${devices.medium}) {
      padding-top: 5rem;
    }
  }
`;

const Booktok = () => {
  return (
    <StyledBookTok>
      <figure className="banner">
        <img src={banner} alt="books banner from tubefilter.com" />
      </figure>

      <Container>
        <article>
          <Heading
            variant="medium"
            text=" What side of <span>tiktok</span> are you on?"
          />

          <StyledText>
            TikTok made me read it! We are staying up to date with #BookTok and
            we've made it easier for you to see what's going viral. Add these
            popular books to your collection and stay up-to-date on the latest
            must-reads.
          </StyledText>

          <Button onClick={() => console.log("click")}>Explore</Button>
        </article>
      </Container>
    </StyledBookTok>
  );
};

export default Booktok;
