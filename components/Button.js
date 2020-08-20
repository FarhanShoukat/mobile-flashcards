import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {black} from "../utils/colors";

export default ({children, onPress, disabled = false, btnStyle = {}, textStyle = {}}) => (
    <TouchableOpacity
        style={[styles.button, btnStyle]}
        onPress={onPress}
        disabled={disabled}
    >
        <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        height: 45,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 22,
        textAlign: 'center'
    }
})