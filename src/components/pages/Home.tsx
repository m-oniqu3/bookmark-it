import { Fragment } from "react";
import background from "../../assets/public_background.png";
import reading from "../../assets/reading.png";
import Genre from "../home/Genre";
import Hero from "../home/Hero";

const heroContent = {
  heading: "Your <span>online</span> bookshelf",
  text: "The preferred bookmarking app for book lovers. Create your online bookshelf and add to your library anytime, anywhere. Stay organized with shelves and never lose track of a book again.",
  button: "Start Organizing",
};

const genreContent = {
  heading: " All your favourites in <span>one</span> place",
  paragraph:
    "If you're looking for a way to keep track of all your favorite books, then BookMark is the app for you! Access all your favorites in one central location. Create your bookshelf and add all your favorite titles to it.",
  src: reading,
  alt: "person reading a book",
  genres: [
    "Fiction",
    "Fantasy",
    "Romance",
    "Humour",
    "Horror",
    "New Adult",
    "Non-Fiction",
    "Mystery",
  ],
};

const Home = () => {
  return (
    <Fragment>
      <Hero
        heading={heroContent.heading}
        text={heroContent.text}
        button={heroContent.button}
        background={background}
      />
      <Genre
        heading={genreContent.heading}
        paragraph={genreContent.paragraph}
        genres={genreContent.genres}
        src={genreContent.src}
        alt={genreContent.alt}
      />
    </Fragment>
  );
};

export default Home;
