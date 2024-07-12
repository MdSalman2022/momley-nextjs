import React from "react";
import { redirect } from "next/navigation";

const Dashboard = () => {
  redirect("/dashboard/overview");
};

export default Dashboard;
