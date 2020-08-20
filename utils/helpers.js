import AsyncStorage from '@react-native-community/async-storage';
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';

const DECKS_STORAGE_KEY = 'MobileFlashcards:Decks'
const NOTIFICATION_STORAGE_KEY = 'MobileFlashcards:Notification'

export const getDecks = () => AsyncStorage.getItem(DECKS_STORAGE_KEY).then(JSON.parse);

export const saveDeckTitle = title => AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
        title,
        questions: [],
    }
}));

export const addCardToDeck = (deck, card) => AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck.title]: {
        ...deck,
        'questions': [
            ...deck.questions,
            card,
        ]
    }
}));

export const clearLocalNotification = () => AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);

const createNotification = () => ({
    title: 'Take a quiz!',
    body: "Hey! don't forget to take a quiz today.",
    ios: {
        sound: true,
    },
    android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
    }
});

export const setLocalNotification = () =>
    AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(18)
                            tomorrow.setMinutes(0)
                            console.warn(tomorrow)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(true))
                        }
                    })
            }
        });