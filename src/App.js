import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from './actions';

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container">
        <h1>Unit test</h1>
        <div>The secret word is {this.props.secretWord}</div>
        <Congrats success={this.props.success}></Congrats>
        <Input></Input>
        <GuessedWords guessedWords={this.props.guessedWords}></GuessedWords>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
