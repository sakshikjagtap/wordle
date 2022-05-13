const fs = require('fs');

const lettersStatus = function (word, guess) {
  const result = [];
  for (let index = 0; index < guess.length; index++) {
    result.push(["a", "present"]);
  }
  return result;
};

const appendGuessedWord = function (guessedWords, wordResult) {
  guessedWords.push(wordResult);
  return guessedWords;
};

const writeToJson = function (file, content) {
  fs.writeFileSync(file, JSON.stringify(content), 'utf8');
};

const writeToFile = function (file, content) {
  fs.writeFileSync(file, content, 'utf8');
};

const generatePage = function (data) {
  const html = "<h1>wordle</h1>";
  return html;
};

const main = function (guess, file) {
  let data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const wordResult = lettersStatus(data.word, guess);
  data.guessedWords = appendGuessedWord(data.guessedWords, wordResult);
  writeToJson(file, data);
  writeToFile('./wordle.html', generatePage(data));
}

main(process.argv[2], './data.json');