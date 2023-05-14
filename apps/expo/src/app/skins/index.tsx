import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function ModerationPage() {
  const { colors } = useTheme();

  const sections = [
    { title: "Profiles", options: [{ label: "Add account" }] },
    {
      title: "Invite a Friend",
      options: [{ label: "Invites: 5" }],
    },
    {
      title: "Moderation",
      options: [
        { label: "Content Moderation" },
        { label: "Muted Accounts" },
        { label: "Blocked Accounts" },
      ],
    },
    {
      title: "Advanced",
      options: [
        { label: "App Passwords" },
        { label: "Content Languages" },
        { label: "Change my handle" },
      ],
    },
    {
      title: "Danger zone",
      options: [{ label: "Delete my account" }],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {sections.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <View style={styles.headerBox}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {section.title}
            </Text>
          </View>
          {section.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={styles.optionContainer}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={[styles.optionText, { color: colors.text }]}>
                {option.label}
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
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  optionIcon: {
    marginRight: 8,
  },
  optionText: {
    fontSize: 16,
  },
});
