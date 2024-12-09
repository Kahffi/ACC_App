import { ReactNode, useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // initializing auth
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ ...user });
        setUserLoggedIn(true);
      } else {
        alert("No account loggedIn");
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        userLoggedIn: userLoggedIn,
        loading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
