import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";

const Dashboard: React.FC = () => {
  // check if the current user is admin:
  const { currentUser } = useContext(AuthContext);

  console.log("halo");

  return (
    <div className="h-full bg-gray-100 p-2 w-full">
      {/* tampilan user biasa */}
      {!currentUser ? (
        <></>
      ) : currentUser?.isAdmin ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
};

export default Dashboard;
