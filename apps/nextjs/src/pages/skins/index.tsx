import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { faEllipsisH, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  faAt,
  faBan,
  faEye,
  faLanguage,
  faLock,
  faPlus,
  faTicket,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useTheme } from "@react-navigation/native";

export default function SkinsPage() {
  const { colors } = useTheme();

  const sections = [
    { title: "Profiles", options: [{ label: "Add account", icon: faPlus }] },
    {
      title: "Invite a Friend",
      options: [{ label: "Invites: 5", icon: faTicket }],
    },
    {
      title: "Moderation",
      options: [
        { label: "Content Moderation", icon: faEye },
        { label: "Muted Accounts", icon: faEyeSlash },
        { label: "Blocked Accounts", icon: faBan },
      ],
    },
    {
      title: "Advanced",
      options: [
        { label: "App Passwords", icon: faLock },
        { label: "Content Languages", icon: faLanguage },
        { label: "Change my handle", icon: faAt },
      ],
    },
    {
      title: "Danger zone",
      options: [{ label: "Delete my account", icon: faTrashAlt }],
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
              <FontAwesomeIcon
                icon={option.icon}
                style={[styles.optionIcon, { color: colors.text }]}
              />
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
