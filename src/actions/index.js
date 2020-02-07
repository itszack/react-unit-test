import axios from 'axios';

import { CORRECT_GUESS, GUESS_WORD, SET_SECRET_WORD } from './types';
import { getLetterMatchCount } from '../helpers';

// export function correctGuess() {
//     return { type: CORRECT_GUESS };
// }

export const guessWord = guessedWord => {
  return function(dispatch, getState) {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: GUESS_WORD,
      payload: { guessedWord, letterMatchCount },
    });

    if (guessedWord === secretWord) {
      dispatch({ type: CORRECT_GUESS });
    }
  };
};

export const getSecretWord = () => {
  return dispatch => {
    return axios.get('localhost:3000').then(response => {
      dispatch({
        type: SET_SECRET_WORD,
        payload: response.data,
      });
    });
  };
};
