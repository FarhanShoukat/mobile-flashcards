import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const Button = ({
  children,
  onPress,
  disabled = false,
  btnStyle = {},
  textStyle = {},
}) => (
  <TouchableOpacity
    style={[styles.button, btnStyle]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.text, textStyle]}>{children}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  btnStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 45,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    textAlign: "center",
  },
});
