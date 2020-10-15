import React from "react";
import { TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { black } from "../utils/colors";

const TextField = ({ onChangeText, placeholder, value, style = {} }) => (
  <TextInput
    onChangeText={(text) => onChangeText(text)}
    placeholder={placeholder}
    value={value}
    style={[styles.textInput, style]}
  />
);

TextField.propTypes = {
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default TextField;

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
