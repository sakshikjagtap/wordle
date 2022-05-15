const lettersValidation = function (word, guess) {
  const result = [];

  for (let index = 0; index < guess.length; index++) {
    let status = 'absent';
    if (word[index] === guess[index]) {
      status = 'correct';
    }
    else if (word.includes(guess[index])) {
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
