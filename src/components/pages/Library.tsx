import { useLocation } from "react-router-dom";

const Library = () => {
  const { pathname } = useLocation();

  const location = pathname.split("/")[2];
  console.log(location);

  return <div>{location}</div>;
};

export default Library;
