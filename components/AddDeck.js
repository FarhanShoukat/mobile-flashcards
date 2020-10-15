import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { saveDeckTitle } from "../utils/helpers";
import { addDeck } from "../actions";
import { black, white } from "../utils/colors";
import Button from "./Button";
import TextField from "./TextField";

const AddDeck = ({ decksTitle, dispatch, navigation }) => {
  const [title, setTitle] = useState("");

  const add = () => {
    if (decksTitle.includes(title)) {
      Alert.alert(
        "Deck already exists",
        `Deck with title ${title} already exists`
      );
      return;
    }

    dispatch(addDeck({ title, questions: [] }));

    saveDeckTitle(title).then(() => {
      navigation.navigate("DeckDetails", { deckTitle: title });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>What is the title of your new deck?</Text>
      <TextField
        onChangeText={(title) => setTitle(title)}
        placeholder="Deck Title"
        value={title}
      />
      <Button
        onPress={add}
        disabled={title === ""}
        btnStyle={{ backgroundColor: black }}
        textStyle={{ color: white }}
      >
        Submit
      </Button>
    </View>
  );
};

const mapStateToProps = (decks) => ({
  decksTitle: Object.keys(decks),
});

export default connect(mapStateToProps)(AddDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "stretch",
  },
  text: {
    textAlign: "center",
    fontSize: 45,
    marginBottom: 20,
  },
});
