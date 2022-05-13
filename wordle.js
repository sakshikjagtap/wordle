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
  const html = '<head><link rel = "stylesheet" href = "style.css"></head><body><h1 class="blue">wordle</h1></body >';
  return html;
};

const main = function (guess, file) {
  let data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const wordResult = lettersStatus(data.word, guess);
  data.guessedWords = appendGuessedWord(data.guessedWords, wordResult);
  writeToJson(file, data);
  writeToFile('./index.html', generatePage(data));
}

main(process.argv[2], './data.json');