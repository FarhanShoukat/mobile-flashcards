import React, { Component } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { connect } from "react-redux";

import TextField from "./TextField";
import Button from "./Button";
import { black, white } from "../utils/colors";
import {addCard} from "../actions";
import {addCardToDeck} from "../utils/helpers";

class AddDeck extends Component {
    state = {
        question: '',
        answer: '',
    }

    addCard = () => {
        const { question, answer } = this.state
        const { deck, dispatch, navigation } = this.props

        if (deck.questions.find(card => card.question === question)) {
            Alert.alert('Question already exists', 'This question already exists in the deck')
            return
        }

        const card = { question, answer }

        dispatch(addCard(deck.title, card))

        addCardToDeck(deck, card).then(() => {
            navigation.goBack()
        })
    }

    render() {
        const { question, answer } = this.state

        return (
            <View style={styles.container}>
                <TextField
                    onChangeText={question => this.setState({ question })}
                    placeholder='Question'
                    value={question}
                />
                <TextField
                    onChangeText={answer => this.setState({ answer })}
                    placeholder='Answer'
                    value={answer}
                />
                <Button
                    onPress={this.addCard}
                    disabled={!question || !answer}
                    btnStyle={{backgroundColor: black}}
                    textStyle={{color: white}}
                >
                    Submit
                </Button>
            </View>
        )
    }
}

const mapStateToProps = (decks, { route }) => ({
    deck: decks[route.params.deckTitle]
});

export default connect(mapStateToProps)(AddDeck);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: white,
        alignItems: 'stretch',
    }
})
