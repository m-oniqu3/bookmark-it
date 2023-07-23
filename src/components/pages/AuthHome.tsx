import { Fragment } from "react";
import reading from "../../assets/book_sitting.png";
import AuthHero from "../home/AuthHero";
import Genre from "../home/Genre";
import TopPicks from "../home/TopPicks";
import Footer from "../nav/Footer";

const topPicksContent = {
  heading: "You might <span>like</span> these",
  paragraph:
    "These books are all great reads that will keep you entertained for hours on end. If you're looking for something new to read, be sure to check out one of these books!",
};

const genreContent = {
  heading: "Seach from your <span>favourite </span> categories",
  paragraph:
    "Search from a wide range of categories and genres. All your favourite books in one place. Create your bookshelf and add all your favorite titles to it.",
  src: reading,
  alt: "person reading a book",
  genres: [
    "Crime Fiction",
    "Self-Help",
    "Fantasy",
    "Romance",
    "Humour",
    "Historical Fiction",
    "Horror",
    "Young Adult",
    "Dystopian Fiction",
  ],
};

const AuthHome = () => {
  return (
    <Fragment>
      <AuthHero />
      <TopPicks heading={topPicksContent.heading} paragraph={topPicksContent.paragraph} filter="spice" />
      <Genre
        heading={genreContent.heading}
        paragraph={genreContent.paragraph}
        genres={genreContent.genres}
        src={genreContent.src}
        alt={genreContent.alt}
      />
      <Footer mode="light" />
    </Fragment>
  );
};

export default AuthHome;
