import { Fragment } from "react";
import background from "../../assets/public_background.png";
import reading from "../../assets/reading.png";
import Booktok from "../home/Booktok";
import Genre from "../home/Genre";
import Hero from "../home/Hero";
import Reviews from "../home/Reviews";
import TopPicks from "../home/TopPicks";

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
  genres: ["Fiction", "Fantasy", "Romance", "Humour", "Horror", "New Adult", "Non-Fiction", "Mystery"],
};

const topPicksContent = {
  heading: "Top picks of the <span>month</span>",
  paragraph:
    "These books are all great reads that will keep you entertained for hours on end. If you're looking for something new to read, be sure to check out one of these books!",
};

const Home = () => {
  return (
    <Fragment>
      <Hero heading={heroContent.heading} text={heroContent.text} button={heroContent.button} background={background} />
      <Genre
        heading={genreContent.heading}
        paragraph={genreContent.paragraph}
        genres={genreContent.genres}
        src={genreContent.src}
        alt={genreContent.alt}
      />
      <TopPicks heading={topPicksContent.heading} paragraph={topPicksContent.paragraph} filter="easy reads" />
      <Booktok />
      <Reviews />
    </Fragment>
  );
};

export default Home;
