import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";

import { black, green, red, white } from "../utils/colors";
import Button from "./Button";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

const Quiz = ({ deck, navigation }) => {
  const [isQuestionShown, setIsQuestionShown] = useState(true);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [correctlyAnswered, setCorrectlyAnswered] = useState(0);

  const setTitle = () => {
    const totalQuestions = deck.questions.length;
    const currQuestionNo = currQuestionIndex + 1;

    navigation.setOptions({
      title:
        totalQuestions + 1 !== currQuestionNo
          ? `Quiz: ${currQuestionNo}/${totalQuestions}`
          : deck.title,
    });
  };

  const onSubmit = (isCorrect) => {
    if (currQuestionIndex + 1 === deck.questions.length)
      clearLocalNotification().then(setLocalNotification);

    if (isCorrect) setCorrectlyAnswered(correctlyAnswered + 1);

    setCurrQuestionIndex(currQuestionIndex + 1);
  };

  const restartQuiz = () => {
    setIsQuestionShown(true);
    setCurrQuestionIndex(0);
    setCorrectlyAnswered(0);
  };

  setTitle();

  const { questions } = deck;

  if (questions.length === currQuestionIndex) {
    return (
      <View style={styles.container}>
        <Text style={styles.score}>
          Score: {correctlyAnswered}/{currQuestionIndex}
        </Text>
        <Button onPress={restartQuiz} btnStyle={styles.restartBtn}>
          Restart Quiz
        </Button>
        <Button
          onPress={() => navigation.goBack()}
          btnStyle={styles.backToDeckBtn}
          textStyle={styles.backToDeckBtnText}
        >
          Back to Deck
        </Button>
      </View>
    );
  }

  const currQuestion = questions[currQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.questionAnswer}>
        {isQuestionShown ? currQuestion.question : currQuestion.answer}
      </Text>
      <Text
        onPress={() => setIsQuestionShown(!isQuestionShown)}
        style={styles.switch}
      >
        {isQuestionShown ? "Show Answer" : "Show Question"}
      </Text>
      <Button
        onPress={() => onSubmit(true)}
        btnStyle={styles.correctBtn}
        textStyle={styles.correctBtnText}
      >
        Correct
      </Button>
      <Button
        onPress={() => onSubmit(false)}
        btnStyle={styles.incorrectBtn}
        textStyle={styles.incorrectBtnText}
      >
        Incorrect
      </Button>
    </View>
  );
};

const mapStateToProps = (decks, { route }) => ({
  deck: decks[route.params.deckTitle],
});

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },

  questionAnswer: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 10,
  },
  switch: {
    color: red,
  },
  correctBtn: {
    backgroundColor: green,
    alignSelf: "stretch",
  },
  correctBtnText: {
    color: white,
  },
  incorrectBtn: {
    backgroundColor: red,
    alignSelf: "stretch",
  },
  incorrectBtnText: {
    color: white,
  },

  score: {
    fontSize: 40,
    marginBottom: 40,
  },
  restartBtn: {
    backgroundColor: white,
    borderColor: black,
    borderWidth: 2,
    alignSelf: "stretch",
  },
  backToDeckBtn: {
    backgroundColor: black,
    alignSelf: "stretch",
  },
  backToDeckBtnText: {
    color: white,
  },
});
