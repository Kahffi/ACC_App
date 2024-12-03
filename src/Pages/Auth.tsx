import ACC_Logo from "@/assets/images/ACC_Logo.png";
import LoginForm from "@/components/forms/LoginForm";
import SignUpForm from "@/components/forms/SignUpForm";
import { useParams } from "react-router-dom";

export default function Auth() {
  const { session } = useParams();
  return (
    <div className="min-h-dvh flex justify-center items-center bg-gray-300">
      <main className="max-w-lg flex flex-col items-center sm:p-10 bg-white sm:w-96 gap-8">
        <div className="flex flex-col items-center gap-1">
          <h1 className="font-semibold text-3xl">
            {session === "login"
              ? "Login"
              : session === "signup"
              ? "Sign Up"
              : "Halo"}
          </h1>
          <img src={ACC_Logo} alt="ACC Logo" className="w-28 sm:w-32" />
        </div>
        {/* forms */}
        <div className="w-full">
          {session === "login" ? (
            <LoginForm />
          ) : session === "signup" ? (
            <SignUpForm />
          ) : (
            <h1>Login</h1>
          )}
        </div>
      </main>
    </div>
  );
}
