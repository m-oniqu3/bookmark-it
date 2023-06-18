import { useLocation } from "react-router-dom";

const Library = () => {
  const { pathname } = useLocation();

  const location = pathname.split("/")[2];

  return <div>{location}</div>;
};

export default Library;
