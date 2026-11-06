import type { ExpoConfig } from "expo/config";

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim() || null;
const previewBuild = process.env.NEGARIN_ANDROID_PREVIEW_BUILD === "1";
const androidPackage = process.env.NEGARIN_ANDROID_APPLICATION_ID?.trim() || (previewBuild ? "ir.negarin.artist.preview" : undefined);

if (previewBuild && androidPackage !== "ir.negarin.artist.preview") {
  throw new Error("Preview builds must use the isolated preview application ID.");
}

if (androidPackage && !/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(androidPackage)) {
  throw new Error("NEGARIN_ANDROID_APPLICATION_ID must be a valid Android application ID.");
}

const config: ExpoConfig = {
  name: previewBuild ? "نگارین هنرمند آزمایشی" : "نگارین هنرمند",
  slug: "negarin-artist",
  version: "0.1.0",
  orientation: "portrait",
  userInterfaceStyle: "light",
  platforms: ["android"],
  android: androidPackage ? { package: androidPackage } : undefined,
  plugins: [
    ["expo-secure-store", { configureAndroidBackup: true }],
    ["expo-image-picker", { cameraPermission: false, microphonePermission: false }]
  ],
  extra: {
    apiBaseUrl
  }
};

export default config;
