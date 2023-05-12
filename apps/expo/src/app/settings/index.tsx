import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@react-navigation/native";

interface Section {
  title: string;
  options: string[];
}

export default function SettingsPage() {
  const { colors } = useTheme();

  const sections: Section[] = [
    { title: "Profiles", options: ["Add account"] },
    { title: "Invite a Friend", options: ["Invites: 5"] },
    {
      title: "Moderation",
      options: ["Content Moderation", "Muted Accounts", "Blocked Accounts"],
    },
    {
      title: "Advanced",
      options: ["App Passwords", "Content Languages", "Change my handle"],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      {sections.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <View style={styles.headerBox}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          {section.options.map((option, optionIndex) => (
            <TouchableOpacity key={optionIndex} style={styles.optionContainer}>
              <Text style={[styles.optionText, { color: colors.text }]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  headerBox: {
    backgroundColor: "#eaeaea",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000", // Set the font color to black
  },
  optionContainer: {
    marginBottom: 4,
  },
  optionText: {
    fontSize: 16,
  },
});
