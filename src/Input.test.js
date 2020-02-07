import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttribute, storeFactory } from '../test/testUtils';
import Input, { UnconnectedInput } from './Input';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store}></Input>)
    .dive()
    .dive();
  return wrapper;
};

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;

    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });

    test('renders component without error', () => {
      const component = findByTestAttribute(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    test('renders input box', () => {
      const inputBox = findByTestAttribute(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });

    test('renders submit button', () => {
      const submitButton = findByTestAttribute(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });
  });

  describe('word has been guessed', () => {
    let wrapper;

    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });

    test('renders component without error', () => {
      const component = findByTestAttribute(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    test('does not render input box', () => {
      const inputBox = findByTestAttribute(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    });

    test('does not render submit button', () => {
      const submitButton = findByTestAttribute(wrapper, 'submit-button');
      expect(submitButton.length).toBe(0);
    });
  });
});

describe('redxu props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  test('`guessWord` action creator is function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe('`guessedWord` action creator call', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';

  beforeEach(() => {
    guessWordMock = jest.fn();

    const props = { guessWord: guessWordMock };

    wrapper = shallow(<UnconnectedInput {...props}></UnconnectedInput>);

    wrapper.instance().inputBox.current = { value: guessedWord };

    const submitButton = findByTestAttribute(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} });
  });

  test('calls `guessedWord` when button is called', () => {
    const guessWordCallCount = guessWordMock.mock.calls.length;

    expect(guessWordCallCount).toBe(1);
  });

  test('calls `guessedWord` with input value as argument', () => {
    const guessedWordArgument = guessWordMock.mock.calls[0][0];

    expect(guessedWordArgument).toBe(guessedWord);
  });

  test('input box clears on submit', () => {
    expect(wrapper.instance().inputBox.current.value).toBe('');
  });
});
