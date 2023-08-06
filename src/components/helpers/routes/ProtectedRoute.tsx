import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks/hooks";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = (props: Props) => {
  const { isSignedIn } = useAppSelector((state) => state.auth);

  //if user is not signed in redirect home else return children components
  if (!isSignedIn) return <Navigate to="/" />;
  else return <div>{props.children}</div>;
};

export default ProtectedRoute;
