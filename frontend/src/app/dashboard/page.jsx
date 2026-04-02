"use client";
import DashboardLayout from "@/layout/dashboardLayout";
import UserLayout from "@/layout/userLayout";
import useAppStore from "@/store/useAppStore";
import React from "react";

function Dashboard() {
  const { user } = useAppStore();
  return (
    <UserLayout>
      <DashboardLayout>
        <h1>Dashboard</h1>
      </DashboardLayout>
    </UserLayout>
  );
}

export default Dashboard;
