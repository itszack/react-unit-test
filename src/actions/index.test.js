import moxios from 'moxios';

import { CORRECT_GUESS } from './types';
import { getSecretWord } from './';
import { storeFactory } from '../../test/testUtils';
import store from '../store';

// describe('correctGuess', () => {
//     test('returns an action type `CORRECT_GUESS`', () => {
//     //     const action = correctGuess();
//     //     expect(action).toEqual({ type: CORRECT_GUESS });
//     });
// });

describe('geuSecretWord action creator', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('adds repsonse to word state', () => {
    const secretWord = 'party';
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: secretWord });
    });

    return store.dispatch(getSecretWord()).then(() => {
      const newState = store.getState();
      expect(newState.secretWord).toBe(secretWord);
    });
  });
});
