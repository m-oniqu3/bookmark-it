import background from "../../assets/public_background.png";
import Hero from "../home/Hero";

const heroContent = {
  heading: "Your <span>online</span> bookshelf",
  text: "The preferred bookmarking app for book lovers. Create your online bookshelf and add to your library anytime, anywhere. Stay organized with shelves and never lose track of a book again.",
  button: "Start Organizing",
};

const Home = () => {
  return (
    <div>
      <Hero
        heading={heroContent.heading}
        text={heroContent.text}
        button={heroContent.button}
        background={background}
      />
    </div>
  );
};

export default Home;
