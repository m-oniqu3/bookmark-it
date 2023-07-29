import nomatch from "../../../assets/404.svg";
import Container from "../ui/Container";
import Empty from "../ui/Empty";

const NoMatch = () => {
  const heading = "Oops! Page not found.";
  const message =
    "Sorry, either you typed the wrong URL or the page you are looking for doesn't exist. Try going back to the home page.";

  return (
    <Container>
      <Empty src={nomatch} heading={heading} message={message} buttonName="Home" route="/" adjust={true} />
    </Container>
  );
};

export default NoMatch;
