import React from "react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../../api/admin";
import { Users, FileText, DollarSign, Activity } from "lucide-react";

export default function AdminDashboard() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => adminApi.getAllUsers(),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );

  const totalUsers = users?.length || 0;
  const pendingKyc =
    users?.filter((u) => u.kycStatus === "submitted").length || 0;
  const totalRevenue =
    users?.reduce((acc, user) => {
      let rev = 0;
      if (user.services?.affidavit?.payment_status === "completed") rev += 399;
      if (user.services?.trust?.payment_status === "completed") rev += 999;
      return acc + rev;
    }, 0) || 0;

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      label: "Pending KYC",
      value: pendingKyc,
      icon: <Activity className="w-6 h-6 text-orange-600" />,
      bg: "bg-orange-100",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      bg: "bg-green-100",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4"
          >
            <div className={`p-3 rounded-lg ${stat.bg}`}>{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
