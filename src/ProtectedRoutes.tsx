import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

export default function ProtectedRoutes() {
  const {
    loading: isLoading,
    currentUser,
    userLoggedIn,
  } = useContext(AuthContext);

  return (
    <>
      {currentUser?.uid ? (
        <Outlet />
      ) : isLoading ? (
        <h1>Loading</h1>
      ) : !currentUser?.uid && isLoading === false && userLoggedIn === false ? (
        <Navigate to={"/auth/login"} />
      ) : (
        <h1>Error Occured</h1>
      )}
    </>
  );
}
