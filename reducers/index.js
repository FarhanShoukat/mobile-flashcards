import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck,
      };
    case ADD_CARD:
      const deck = state[action.deckTitle];
      return {
        ...state,
        [deck.title]: {
          ...deck,
          questions: [...deck.questions, action.card],
        },
      };
    default:
      return state;
  }
};
