import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function useAuth() {
  async function doSignInWithEmailAndPass(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  return { doSignInWithEmailAndPass };
}
