const fs = require('fs');

const randomInt = limit => Math.floor(Math.random() * limit);

const readWords = file => fs.readFileSync(file, 'utf8').split('\n');

const randomWord = list => list[randomInt(list.length)];

const writeToFile = (file, content) => fs.writeFileSync(file, content, 'utf8');

const startUpData = function (word) {
  return {
    word: word.toLowerCase(),
    guessedWords: [],
    isGameOver: false
  };
};

const main = function () {
  const words = readWords('./resources/words.txt');

  const data = startUpData(randomWord(words))
  writeToFile('./resources/data.json', JSON.stringify(data));
};

main();
