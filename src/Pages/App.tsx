import CompactProfile from "@/components/home/CompactProfile";
import SideBar from "@/components/home/SideBar";
import acc_logo from "@/assets/images/ACC_Logo.png";
import NavBar from "@/components/home/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex bg-gray-300 gap-3 min-h-dvh px-4 pt-3">
      <SideBar className="col-span-1 border border-red-600 flex-1 max-w-[320px] ">
        <CompactProfile />
        <div className="bg-white flex gap-2 p-2 rounded-md items-center">
          <img src={acc_logo} alt="ACC logo" className="w-8" />
          <div>
            <p className="text-gray-600 text-xs">AR Management Head</p>
            <p className="text-blue-500">Astra Credit Companies</p>
          </div>
        </div>
        <NavBar />
      </SideBar>
      <main className="border-black border flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
