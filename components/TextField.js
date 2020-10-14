import React from "react";
import { TextInput, StyleSheet } from "react-native";

import { black } from "../utils/colors";

export default ({ onChangeText, placeholder, value, style = {} }) => (
  <TextInput
    onChangeText={(text) => onChangeText(text)}
    placeholder={placeholder}
    value={value}
    style={[styles.textInput, style]}
  />
);

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: black,
    borderRadius: 8,
    padding: 8,
    marginTop: 20,
    marginBottom: 20,
  },
});
