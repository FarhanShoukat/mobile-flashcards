import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from "react-redux";

import { black, green, red, white } from "../utils/colors";
import Button from "./Button";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends Component {
    state = {
        isQuestionShown: true,
        currQuestionIndex: 0,
        correctlyAnswered: 0,
    }

    toggleQuestionShow = () => this.setState(state => ({
        isQuestionShown: !state.isQuestionShown,
    }))

    setTitle = () => {
        const totalQuestions = this.props.deck.questions.length
        const currQuestionNo = this.state.currQuestionIndex + 1

        this.props.navigation.setOptions({
            title: totalQuestions + 1 !== currQuestionNo
                ? `Quiz: ${currQuestionNo}/${totalQuestions}`
                : this.props.deck.title
        })
    }

    onSubmit = isCorrect => {
        if (this.state.currQuestionIndex + 1 === this.props.deck.questions.length)
            clearLocalNotification()
                .then(setLocalNotification)

        if (isCorrect)
            this.setState(state => ({ correctlyAnswered: state.correctlyAnswered + 1 }))

        this.setState(state => ({ currQuestionIndex: state.currQuestionIndex + 1 }))
    }

    restartQuiz = () => this.setState({
        isQuestionShown: true,
        currQuestionIndex: 0,
        correctlyAnswered: 0,
    })

    backToDeck = () => this.props.navigation.goBack()

    render() {
        this.setTitle()

        const { isQuestionShown, currQuestionIndex, correctlyAnswered } = this.state
        const { questions } = this.props.deck

        if (questions.length === currQuestionIndex) {
            return (
                <View style={styles.container}>
                    <Text style={styles.score}>
                        Score: {correctlyAnswered}/{currQuestionIndex}
                    </Text>
                    <Button
                        onPress={this.restartQuiz}
                        btnStyle={styles.restartBtn}
                    >
                        Restart Quiz
                    </Button>
                    <Button
                        onPress={this.backToDeck}
                        btnStyle={styles.backToDeckBtn}
                        textStyle={styles.backToDeckBtnText}
                    >
                        Back to Deck
                    </Button>
                </View>
            )
        }

        const currQuestion = questions[currQuestionIndex]

        return (
            <View style={styles.container}>
                <Text style={styles.questionAnswer}>
                    {isQuestionShown
                        ? currQuestion.question
                        : currQuestion.answer}
                </Text>
                <Text onPress={this.toggleQuestionShow} style={styles.switch}>
                    {isQuestionShown
                        ? 'Show Answer'
                        : 'Show Question'}
                </Text>
                <Button
                    onPress={() => this.onSubmit(true)}
                    btnStyle={styles.correctBtn}
                    textStyle={styles.correctBtnText}>
                    Correct
                </Button>
                <Button
                    onPress={() => this.onSubmit(false)}
                    btnStyle={styles.incorrectBtn}
                    textStyle={styles.incorrectBtnText}>
                    Incorrect
                </Button>
            </View>
        )
    }
}

const mapStateToProps = (decks, { route }) => ({
    deck: decks[route.params.deckTitle]
})

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },

    questionAnswer: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 10,
    },
    switch: {
        color: red
    },
    correctBtn: {
        backgroundColor: green,
        alignSelf: 'stretch',
    },
    correctBtnText: {
        color: white,
    },
    incorrectBtn: {
        backgroundColor: red,
        alignSelf: 'stretch',
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
        alignSelf: 'stretch',
    },
    backToDeckBtn: {
        backgroundColor: black,
        alignSelf: 'stretch',
    },
    backToDeckBtnText: {
        color: white,
    },
})
