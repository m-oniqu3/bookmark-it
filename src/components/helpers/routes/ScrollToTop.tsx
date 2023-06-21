import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ScrollToTop({ children }: Props): JSX.Element {
  const location = useLocation();

  // scroll to top of page on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children as JSX.Element;
}
