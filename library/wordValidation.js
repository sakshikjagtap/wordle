const incrementOccurence = function (frequency, letter) {
  const occurence = frequency[letter] ? ++frequency[letter] : 1;
  frequency[letter] = occurence;
  return frequency;
};

const getFrequency = function (word) {
  return [...word].reduce(incrementOccurence, {});
};

const isKeyPresent = function (object, key) {
  return Object.keys(object).includes(key);
};

const isPresent = function (letter, actualWordFrequency, guessedWordFrequency) {
  if (!isKeyPresent(actualWordFrequency, letter)) {
    return false;
  }
  return actualWordFrequency[letter] > guessedWordFrequency[letter];
};

const isAtCorrectPosition = function (word, guess, index) {
  return word[index] === guess[index];
};

const setToZero = function (frequency, letter) {
  frequency[letter] = 0;
  return frequency;
};

const initializeFrequency = function (word) {
  return [...word].reduce(setToZero, {});
};

const lettersValidation = function (word, guess) {
  const result = [];
  const frequency = getFrequency(word);
  const guessedWordFrequency = initializeFrequency(guess);

  for (let index = 0; index < guess.length; index++) {
    let status = 'absent';
    if (isAtCorrectPosition(word, guess, index)) {
      incrementOccurence(guessedWordFrequency, guess[index])
      status = 'correct';
    }
    else if (isPresent(guess[index], frequency, guessedWordFrequency)) {
      incrementOccurence(guessedWordFrequency, guess[index])
      status = 'present';
    }
    result.push([guess[index], status]);
  }
  return result;
};

const isWordValid = function (word, validWords) {
  return word.length === 5 && validWords.includes(word);
};

exports.isWordValid = isWordValid;
exports.lettersValidation = lettersValidation;
