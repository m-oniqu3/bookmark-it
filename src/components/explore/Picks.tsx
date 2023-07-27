import { Navigate, useParams } from "react-router-dom";
import useExplore from "../../hooks/useExplore";
import { StyledGrid } from "../../styles/StyledGrid";

const Picks = () => {
  const { category } = useParams<{ category: string }>() as { category: string };

  const books = useExplore(category);

  if (!category) {
    return <Navigate to="/explore/picks/all" replace={true} />;
  }

  return (
    <div>
      <StyledGrid>{books}</StyledGrid>
    </div>
  );
};

export default Picks;
