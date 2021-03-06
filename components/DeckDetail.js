import React from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { black, white } from "../utils/colors";
import Button from "./Button";

const DeckDetail = ({ deck, navigation }) => {
  const { title, questions } = deck;

  navigation.setOptions({
    title: deck.title,
  });

  const addCard = () =>
    navigation.navigate("Add Card", {
      deckTitle: deck.title,
    });

  const startQuiz = () => {
    if (deck.questions.length)
      navigation.navigate("Quiz", { deckTitle: deck.title });
    else
      Alert.alert(
        "No cards in deck",
        "You cannot take the quiz. Deck has no cards."
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.deckTitle}>{title}</Text>
      <Text>{Object.keys(questions).length} cards</Text>
      <Button btnStyle={styles.addCardBtn} onPress={addCard}>
        Add Card
      </Button>
      <Button
        btnStyle={styles.startQuizBtn}
        textStyle={styles.startQuizBtnText}
        onPress={startQuiz}
      >
        Start Quiz
      </Button>
    </View>
  );
};

DeckDetail.propTypes = {
  deck: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = (state, { route }) => ({
  deck: state[route.params.deckTitle],
});

export default connect(mapStateToProps)(DeckDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  deckTitle: {
    fontSize: 30,
    margin: 10,
  },
  addCardBtn: {
    backgroundColor: white,
    borderColor: black,
    borderWidth: 2,
    alignSelf: "stretch",
  },
  startQuizBtn: {
    backgroundColor: black,
    alignSelf: "stretch",
  },
  startQuizBtnText: {
    color: white,
  },
});
