import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";

import { getDecks } from "../utils/helpers";
import { receiveDecks } from "../actions";
import { white } from "../utils/colors";

const DecksList = ({ decks, dispatch, navigation }) => {
  useEffect(() => {
    getDecks().then((decks) => dispatch(receiveDecks(decks)));
  }, []);

  const renderItem = ({ item }) => {
    const { title, questions } = item;

    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("DeckDetails", { deckTitle: title })}
      >
        <View style={styles.row}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text>{Object.keys(questions).length} cards</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={decks}
        renderItem={renderItem}
        keyExtractor={(deck) => deck.title}
      />
    </View>
  );
};

const mapStateToProps = (decks) => ({
  decks: Object.values(decks),
});

export default connect(mapStateToProps)(DecksList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  row: {
    alignItems: "center",
    padding: 20,
    backgroundColor: white,
  },
  deckTitle: {
    fontSize: 30,
    margin: 10,
  },
});
