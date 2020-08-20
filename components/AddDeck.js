import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { saveDeckTitle } from "../utils/helpers";
import { addDeck } from '../actions';
import { black, white } from "../utils/colors";
import Button from "./Button";
import TextField from "./TextField";

class AddDeck extends Component {
    state = {
        title: ''
    }

    addDeck = () => {
        const { title } = this.state
        const { decksTitle, dispatch, navigation } = this.props

        if (decksTitle.includes(title)) {
            Alert.alert('Deck already exists', `Deck with title ${title} already exists`)
            return
        }

        dispatch(addDeck({title, questions: []}))

        saveDeckTitle(title).then(() => {
            navigation.navigate('DeckDetails', { deckTitle: title })
        })
    }

    render() {
        const { title } = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.text}>What is the title of your new deck?</Text>
                <TextField
                    onChangeText={title => this.setState({ title })}
                    placeholder='Deck Title'
                    value={title}
                />
                <Button
                    onPress={this.addDeck}
                    disabled={title === ''}
                    btnStyle={{backgroundColor: black}}
                    textStyle={{color: white}}
                >
                    Submit
                </Button>
            </View>
        )
    }
}

const mapStateToProps = decks => ({
    decksTitle: Object.keys(decks)
});

export default connect(mapStateToProps)(AddDeck);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    text: {
        textAlign: 'center',
        fontSize: 45,
        marginBottom: 20,
    },
})