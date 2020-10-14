import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { Component } from "react";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";

import DecksList from "./components/DecksList";
import AddDeck from "./components/AddDeck";
import DeckDetail from "./components/DeckDetail";
import reducer from "./reducers";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { setLocalNotification } from "./utils/helpers";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsComponent = () => (
  <Tabs.Navigator>
    <Tabs.Screen
      name="Decks"
      component={DecksList}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons
            size={30}
            style={{ marginBottom: -3 }}
            name="ios-code"
            color={color}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="Add Deck"
      component={AddDeck}
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesome name="plus-square" color={color} />
        ),
      }}
    />
  </Tabs.Navigator>
);

class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <View style={{ height: Constants.statusBarHeight }}>
            <StatusBar style="auto" />
          </View>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={TabsComponent}
              />
              <Stack.Screen name="DeckDetails" component={DeckDetail} />
              <Stack.Screen name="Add Card" component={AddCard} />
              <Stack.Screen name="Quiz" component={Quiz} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
