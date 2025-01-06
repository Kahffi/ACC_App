import { User } from "firebase/auth";
import { createContext } from "react";

type TAuthContext = {
  currentUser: CurrentUser | null;
  userLoggedIn: boolean;
  loading: boolean;
};

interface CurrentUser extends User {
  isAdmin: boolean;
  fullName: string;
}

export const AuthContext = createContext<TAuthContext>({
  currentUser: null,
  userLoggedIn: false,
  loading: true,
});
