import React from "react";
import { redirect } from "next/navigation";

const SettingsPage = () => {
  redirect("/dashboard/settings/store-setting/notifications");
};

export default SettingsPage;
