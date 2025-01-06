import CompactProfile from "@/components/home/CompactProfile";
import SideBar from "@/components/home/SideBar";
import acc_logo from "@/assets/images/ACC_Logo.png";
import NavBar from "@/components/home/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex bg-[--far-background] gap-10 min-h-dvh px-8 sm:pt-6">
      <SideBar className="flex flex-col gap-3 flex-1 max-w-[280px] ">
        <CompactProfile />
        <div className="bg-white flex gap-2 p-2 rounded-md items-center mt-5 shadow-black/40 shadow-md">
          <img src={acc_logo} alt="ACC logo" className="w-8" />
          <div>
            <p className="text-gray-600 text-xs">AR Management Head</p>
            <p className="text-blue-500">Astra Credit Companies</p>
          </div>
        </div>
        <NavBar />
      </SideBar>
      <main className="border-black border flex-[2]">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
