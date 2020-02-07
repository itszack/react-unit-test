export const getLetterMatchCount = (guessedWord, secretWord) => {
  const secretLetterSet = new Set(secretWord.split(''));
  const guesseLetterSet = new Set(guessedWord.split(''));

  return [...secretLetterSet].filter(letter => guesseLetterSet.has(letter))
    .length;
};
