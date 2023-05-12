import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "blueskeet",
  slug: "blueskeet",
  scheme: "blueskeet",
  version: "1.0.0",
  owner: "snlabat",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#1F104A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/2b803f3b-59e8-4c91-8a37-2ca3c2696416",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "your.bundle.identifier",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
  },
  extra: {
    eas: {
      projectId: "2b803f3b-59e8-4c91-8a37-2ca3c2696416",
    },
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
