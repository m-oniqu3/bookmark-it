import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import banner from "../../assets/banner.jpg";
import background from "../../assets/text-bg.png";
import { StyledText } from "../../styles/StyledText";
import { devices } from "../../styles/breakpoints";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Heading from "../helpers/ui/Heading";

const StyledBookTok = styled.div`
  background-image: url(${background});
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

      span {
        font-weight: 500;
      }
    }

    @media (${devices.medium}) {
      padding-top: 5rem;
    }
  }
`;

const Booktok = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/explore");
  };

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
            TikTok made me read it! We are staying up to date with{" "}
            <span>#BookTok</span> and we've made it easier for you to see what's
            going viral. Add these popular books to your collection and stay
            up-to-date on the latest must-reads.
          </StyledText>

          <Button onClick={handleNavigation}>Explore</Button>
        </article>
      </Container>
    </StyledBookTok>
  );
};

export default Booktok;
