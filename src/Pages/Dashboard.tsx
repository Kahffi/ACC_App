import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import AdminDashboard from "./AdminDashboard";

const Dashboard: React.FC = () => {
  // check if the current user is admin:
  const { currentUser } = useContext(AuthContext);

  console.log("halo");

  return (
    <div className="h-full bg-gray-100 p-2 w-full">
      {/* tampilan user biasa */}
      {currentUser?.isAdmin ? <AdminDashboard /> : <div></div>}
    </div>
  );
};

export default Dashboard;
