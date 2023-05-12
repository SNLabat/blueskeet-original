import {
  ImageBackground,
  Text,
  View,
  type ImageSourcePropType,
  Animated,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { LinkButton } from "./components/button";
import React, { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const background = require("../../assets/blueskeet.png") as ImageSourcePropType;

export default function LandingPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <ImageBackground
        style={styles.background}
        source={background}
        imageStyle={styles.image}
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
            blueskeet
          </Animated.Text>
          <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
            <LinkButton href="/login" variant="white">
              Log in
            </LinkButton>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  image: {
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(55, 0, 55, 0.5)",
  },
  content: {
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
  buttonContainer: {
    opacity: 0,
  },
});
