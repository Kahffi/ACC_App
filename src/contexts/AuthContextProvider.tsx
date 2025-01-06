import { ReactNode, useEffect, useState } from "react";
import { auth, database } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { onValue, ref } from "firebase/database";

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [fullName, setFullName] = useState<string>("");

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

  // get username
  useEffect(() => {
    console.log("use effect started");
    if (!currentUser) return;
    const req = onValue(
      ref(database, `users/${currentUser?.uid}/username`),

      (snapshot) => {
        console.log(currentUser.email);
        console.log(`users/${currentUser?.uid}/username`);
        const data: string | null = snapshot.val();
        if (data) setFullName(data);
        console.log("usernme assigned", data);
      }
    );

    return () => req();
  }, [currentUser]);

  // check if user is admin or not
  useEffect(() => {
    if (fullName === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [fullName]);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser
          ? { ...currentUser, isAdmin: isAdmin, fullName: fullName }
          : null,
        userLoggedIn: userLoggedIn,
        loading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
