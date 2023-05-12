import {
  ImageBackground,
  Text,
  View,
  type ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { LinkButton } from "../components/button";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const background = require("../../assets/blueskeet.png") as ImageSourcePropType;

export default function LandingPage() {
  return (
    <View className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <ImageBackground className="flex-1" source={background}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.text}>blueskeet</Text>
          <LinkButton href="/login" variant="white">
            Log in
          </LinkButton>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
});
