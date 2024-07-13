import React from "react";
import { redirect } from "next/navigation";

const SettingsPage = () => {
  redirect("/dashboard/settings/users&permissions");
};

export default SettingsPage;
