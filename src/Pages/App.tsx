import CompactProfile from "@/components/Dashboard/CompactProfile";
import SideBar from "@/components/Dashboard/SideBar";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex bg-gray-300 gap-3 min-h-dvh">
      <SideBar className="col-span-1 border border-red-600 flex-1 max-w-[320px] ">
        <CompactProfile />
      </SideBar>
      <main className="border-black border flex-1">
        <h1>Some Big SHit</h1>
      </main>
    </div>
  );
}

export default App;
