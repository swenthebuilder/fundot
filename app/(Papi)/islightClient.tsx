"use client";
import { useState, useEffect } from "react";
import { settings } from "@/app/settings";

export default function IslightClient() {
  // State for the Light Client setting
  const [LightClient, setLightClient] = useState<boolean>(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = settings.get("settings");
    if (savedSettings?.lightClients !== undefined) {
      setLightClient(savedSettings.lightClients);
    }
  }, []);

  // Update settings in localStorage when LightClient changes
  useEffect(() => {
    settings.updateProperty("settings", "lightClients", LightClient);
  }, [LightClient]);

  return (
    <div className="flex flex-col gap-2">
      <p>LightClient</p>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={LightClient}
          onChange={(e) => setLightClient(e.target.checked)}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {LightClient ? "true" : "false"}
        </span>
      </label>
    </div>
  );
}
