import { combineReducers } from 'redux';

import successReducer from './successReducer';
import guessedWordReducer from './guessedWordReducer';
import secretWordReducer from './secretWordReducer';

export default combineReducers({
  success: successReducer,
  guessedWords: guessedWordReducer,
  secretWord: secretWordReducer,
});
