const fs = require('fs');

const lettersStatus = function (word, guess) {
  const result = [];
  for (let index = 0; index < guess.length; index++) {
    result.push(['a', 'correct']);
  }
  return result;
};

const appendGuessedWord = function (guessedWords, wordResult) {
  guessedWords.push(wordResult);
  return guessedWords;
};

const generateTag = (tag, content, property) => {
  let style = '';
  if (property) {
    style = ' class="' + property + '"';
  }
  return '<' + tag + style + '>' + content + '</' + tag + '>';
};

const writeToJson = (file, content) =>
  fs.writeFileSync(file, JSON.stringify(content), 'utf8');

const writeToFile = (file, content) =>
  fs.writeFileSync(file, content, 'utf8');

const generateLetter = ([letter, status]) =>
  generateTag('div', letter, status);

const generateWord = letters =>
  generateTag('div', letters.map(generateLetter).join(''), 'word');

const emptyRow = numOfCells => {
  let row = '';
  for (let index = 0; index < numOfCells; index++) {
    row += generateTag('div', '', '');
  }
  return generateTag('div', row, 'word');
}

const emptyRows = numOfRows => {
  const rows = [];
  for (let index = 0; index < numOfRows; index++) {
    rows.push(emptyRow(5));
  }
  return rows;
};

const wordleTable = function (prevAttempts) {
  const generatedWords = prevAttempts.map(generateWord);
  const attemptsLeft = 6 - prevAttempts.length;
  const generatedEmptyRows = emptyRows(attemptsLeft);
  return generatedWords.concat(generatedEmptyRows).join('');
};

const readFile = filePath => fs.readFileSync(filePath, 'utf8');

const generatePage = function (table, message, templateAsString) {
  return templateAsString.replace(/_GUESSED-WORDS_/, table).replace(/_MESSAGE_/, message);
};

const getMessage = function (data, guess) {
  if (data.word === guess) {
    return 'CONGRAGULATIONS!!! You got it right';
  }
  if (data.guessedWords.length === 6) {
    return 'OOPS!!! Better luck next time. Correct word was' + data.word;
  }
  return '';
};

const main = function (guess, file, template) {
  let data = JSON.parse(readFile(file));
  const templateAsString = readFile(template);
  let prevAttempts = data.guessedWords;

  const wordResult = lettersStatus(data.word, guess);
  prevAttempts = appendGuessedWord(prevAttempts, wordResult);
  writeToJson(file, data);

  const message = getMessage(data, guess);
  const webpage = generatePage(wordleTable(prevAttempts), message, templateAsString);
  writeToFile('./index.html', webpage);
}

main(process.argv[2], './resources/data.json', './resources/template.html');