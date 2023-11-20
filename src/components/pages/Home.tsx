import { Fragment } from "react";

import reading from "../../assets/reading.png";
import Booktok from "../home/Booktok";
import Genre from "../home/Genre";
import Hero from "../home/Hero";
import Reviews from "../home/Reviews";
import TopPicks from "../home/TopPicks";

const genreContent = {
  heading: "All your favourites in <span>one</span> place",
  paragraph:
    "If you're looking for a way to keep track of all your favorite books, then BookMark is the app for you! Access all your favorites in one central location. Create your bookshelf and add all your favorite titles to it.",
  src: reading,
  alt: "person reading a book",
  genres: ["Fiction", "Fantasy", "Romance", "Humour", "Horror", "New Adult", "Non-Fiction", "Mystery"],
};

const topPicksContent = {
  heading: "Check <span>these</span> books out ",
  paragraph:
    "These books are all great reads that will keep you entertained for hours on end. If you're looking for something new to read, be sure to check out one of these books!",
};

const Home = () => {
  return (
    <Fragment>
      <Hero />
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
