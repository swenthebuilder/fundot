"use client";

import { useEffect } from "react";
import { BasicStorage } from "./utils/UseLocalStorage";

// Define settings interface
export interface Settings {
  lightClients: boolean;
  customWWS?: boolean | null;
}

// Instantiate BasicStorage for settings
export const settings = new BasicStorage<string, Settings>();

// Component to initialize settings in localStorage
export function GlobeSettings() {
  useEffect(() => {
    // Check if settings already exist in localStorage
    const existingSettings = settings.get("settings");

    // Only set defaults if no settings are present
    if (!existingSettings) {
      settings.set("settings", {
        lightClients: true,
        customWWS: false,
      });
    }
  }, []);

  return null; // No UI elements needed
}
