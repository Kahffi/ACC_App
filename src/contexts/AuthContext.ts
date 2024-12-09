import { User } from "firebase/auth";
import { createContext } from "react";

type TAuthContext = {
  currentUser: null | User;
  userLoggedIn: boolean;
  loading: boolean;
};

export const AuthContext = createContext<TAuthContext>({
  currentUser: null,
  userLoggedIn: false,
  loading: true,
});
