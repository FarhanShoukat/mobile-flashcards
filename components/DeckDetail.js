import React, { Component } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { black, white } from "../utils/colors";
import Button from "./Button";

class DeckDetail extends Component {
  setTitle = (deck) => {
    this.props.navigation.setOptions({
      title: deck.title,
    });
  };

  addCard = () =>
    this.props.navigation.navigate("Add Card", {
      deckTitle: this.props.deck.title,
    });

  startQuiz = () => {
    const { deck, navigation } = this.props;

    if (deck.questions.length)
      navigation.navigate("Quiz", { deckTitle: deck.title });
    else
      Alert.alert(
        "No cards in deck",
        "You cannot take the quiz. Deck has no cards."
      );
  };

  render() {
    const { deck } = this.props;
    const { title, questions } = deck;
    this.setTitle(deck);

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text>{Object.keys(questions).length} cards</Text>
        <Button btnStyle={styles.addCardBtn} onPress={this.addCard}>
          Add Card
        </Button>
        <Button
          btnStyle={styles.startQuizBtn}
          textStyle={styles.startQuizBtnText}
          onPress={this.startQuiz}
        >
          Start Quiz
        </Button>
      </View>
    );
  }
}

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
