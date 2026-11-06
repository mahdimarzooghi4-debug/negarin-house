import type { ExpoConfig } from "expo/config";

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim() || null;
const androidPackage = process.env.NEGARIN_ANDROID_APPLICATION_ID?.trim();

if (androidPackage && !/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(androidPackage)) {
  throw new Error("NEGARIN_ANDROID_APPLICATION_ID must be a valid Android application ID.");
}

const config: ExpoConfig = {
  name: "نگارین هنرمند",
  slug: "negarin-artist",
  version: "0.1.0",
  orientation: "portrait",
  userInterfaceStyle: "light",
  platforms: ["android"],
  android: androidPackage ? { package: androidPackage } : undefined,
  plugins: [
    ["expo-secure-store", { configureAndroidBackup: true }]
  ],
  extra: {
    apiBaseUrl
  }
};

export default config;
