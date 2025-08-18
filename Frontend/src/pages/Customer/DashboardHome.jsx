import { useAuth } from "../../context/AuthContext"
import React from "react";

const DashboardHome = () => {
  const { user } = useAuth();
  return (
    <div className="bg-gray-100 shadow rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name || 'Customer'}</h2>
    </div>
  );
};

export default DashboardHome;
