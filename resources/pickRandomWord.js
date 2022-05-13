const fs = require('fs');

const isFiveLetterWord = word => word.length === 5;

const randomInt = limit => Math.floor(Math.random() * limit);

const readWords = file => fs.readFileSync(file, 'utf8').split('\n');

const randomWord = list => list[randomInt(list.length)];

const writeToFile = function (word, file) {
  const data = {
    'word': word,
    'guessedWords': []
  };
  fs.writeFileSync(file, JSON.stringify(data), 'utf8');
};

const main = function () {
  const words = readWords('/usr/share/dict/words');
  const fiveLetterWords = words.filter(isFiveLetterWord);
  writeToFile(randomWord(fiveLetterWords), './resources/data.json');
};

main();
