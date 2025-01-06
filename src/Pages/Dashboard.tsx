import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const Dashboard: React.FC = () => {
  // check if the current user is admin:
  const { currentUser } = useContext(AuthContext);

  return <div className="h-full bg-gray-100 p-2 w-full"></div>;
};

export default Dashboard;
