import ACC_Logo from "@/assets/images/ACC_Logo.png";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className="min-h-dvh flex justify-center items-center bg-gray-300">
      <main className="max-w-lg flex flex-col items-center sm:p-10 bg-white sm:w-96">
        <img src={ACC_Logo} alt="ACC Logo" width={100} />
        <h1>AUTH</h1>
        {/* forms */}
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
