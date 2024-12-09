import ACC_Logo from "@/assets/images/ACC_Logo.png";
import LoginForm from "@/components/forms/LoginForm";
import SignUpForm from "@/components/forms/SignUpForm";
import { Link, useParams } from "react-router-dom";

export default function AuthPage() {
  const { session } = useParams();
  return (
    <div className="min-h-dvh flex justify-center sm:items-center bg-gray-300">
      <main className="w-full p-5 sm:max-w-2xl flex flex-col items-center sm:p-10 bg-white sm:w-3/4 gap-8 rounded-lg shadow-lg shadow-gray-900/40">
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
            <>
              <LoginForm />
              <p className="text-sm text-gray-700 text-center mt-1">
                Don't have an account?{" "}
                <Link to={"/auth/signup"} className="underline text-blue-600">
                  Register
                </Link>
              </p>
            </>
          ) : session === "signup" ? (
            <>
              <SignUpForm />
              <p className="text-sm text-gray-700 text-center mt-1">
                Already have an account?{" "}
                <Link to={"/auth/login"} className="underline text-blue-600">
                  Login
                </Link>
              </p>
            </>
          ) : (
            <h1>Login</h1>
          )}
        </div>
      </main>
    </div>
  );
}
