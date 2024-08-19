"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useUser from "@/hooks/useUser";
import { Checkbox } from "@/components/ui/checkbox";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import toast from "react-hot-toast";
import { Switch } from "@headlessui/react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="flex gap-10 w-full border-b">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          onClick={() => setActiveTab(tab.label)}
          className={`pb-3 ${
            activeTab === tab.label ? "font-semibold border-black border-b" : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const SettingOption = ({ title, description, checked, onChange }) => {
  return (
    <div className="py-3 hover:bg-gray-100 px-3 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-medium">{title}</p>
          <p className="text-sm font-normal">{description}</p>
        </div>
        <Switch
          checked={checked}
          onChange={onChange}
          className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-blue-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-blue-500 data-[checked]:bg-blue-500"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
          />
        </Switch>
      </div>
    </div>
  );
};

const LanguageOption = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="py-3 hover:bg-gray-100 px-3 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-medium">Language</p>
          <p className="text-sm font-normal">Select your preferred language</p>
        </div>
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-48">{selectedLanguage}</SelectTrigger>
          <SelectContent>
            <SelectItem value="Bangla">Bangla</SelectItem>
            <SelectItem value="English">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const MySetting = () => {
  const { userInfo } = useContext(StateContext);
  const { updateCustomer } = useUser();
  const [emailPermission, setEmailPermission] = useState(false);
  const [smsPermission, setSmsPermission] = useState(false);
  const [pushNotificationPermission, setPushNotificationPermission] =
    useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [initialState, setInitialState] = useState({});

  useEffect(() => {
    const initialEmailPermission =
      userInfo?.customer?.preferences?.notifications?.email;
    const initialSmsPermission =
      userInfo?.customer?.preferences?.notifications?.sms;
    const initialPushNotificationPermission =
      userInfo?.customer?.preferences?.notifications?.push;
    const initialSelectedLanguage =
      userInfo?.customer?.preferences?.language === "en" ? "English" : "Bangla";

    setEmailPermission(initialEmailPermission);
    setSmsPermission(initialSmsPermission);
    setPushNotificationPermission(initialPushNotificationPermission);
    setSelectedLanguage(initialSelectedLanguage);

    setInitialState({
      emailPermission: initialEmailPermission,
      smsPermission: initialSmsPermission,
      pushNotificationPermission: initialPushNotificationPermission,
      selectedLanguage: initialSelectedLanguage,
    });
  }, [userInfo]);

  const tabs = [{ label: "Basic Setting" }, { label: "Privacy Setting" }];

  const handleUpdateCustomer = async () => {
    const payload = {
      id: userInfo?.customer?._id,
      preferences: {
        notifications: {
          email: emailPermission,
          sms: smsPermission,
          push: pushNotificationPermission,
        },
        language: selectedLanguage === "English" ? "en" : "bn",
      },
    };

    console.log("payload", payload);
    const response = await updateCustomer(payload);

    if (response?.success) {
      toast.success("Settings updated successfully");
    }
  };

  const hasChanges = () => {
    return (
      emailPermission !== initialState.emailPermission ||
      smsPermission !== initialState.smsPermission ||
      pushNotificationPermission !== initialState.pushNotificationPermission ||
      selectedLanguage !== initialState.selectedLanguage
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-lg">Setting</p>
        <button
          onClick={handleUpdateCustomer}
          type="submit"
          className={`primary-btn ${
            !hasChanges() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!hasChanges()}
        >
          Save
        </button>
      </div>

      <div className="border px-4 py-6 bg-white ">
        <Tabs tabs={tabs} />
        <>
          <SettingOption
            title="Email"
            description="Receive notifications via email"
            checked={emailPermission}
            onChange={() => setEmailPermission(!emailPermission)}
          />
          <SettingOption
            title="SMS"
            description="Receive notifications via SMS"
            checked={smsPermission}
            onChange={() => setSmsPermission(!smsPermission)}
          />
          <SettingOption
            title="Push Notification"
            description="Receive notifications via push notifications"
            checked={pushNotificationPermission}
            onChange={() =>
              setPushNotificationPermission(!pushNotificationPermission)
            }
          />
          <LanguageOption
            selectedLanguage={selectedLanguage}
            onLanguageChange={(value) => setSelectedLanguage(value)}
          />
        </>
      </div>
    </div>
  );
};

export default MySetting;
