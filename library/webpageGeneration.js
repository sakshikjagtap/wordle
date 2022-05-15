const { updateGameData, readFile, readJSON, writeFile, writeJson } = require('./dataModifiers.js');
const { isWordValid } = require('./wordValidation.js');

const getMessage = function (data, guess) {
  if (data.word === guess) {
    return 'CONGRAGULATIONS!!! You got it right';
  }
  if (data.guessedWords.length === 6) {
    return 'OOPS!!! Better luck next time. Correct word was ' + data.word;
  }
  return '';
};

const generateTag = function (tag, content, property) {
  let style = '';
  if (property) {
    style = ' class="' + property + '"';
  }
  return '<' + tag + style + '>' + content + '</' + tag + '>';
};

const generateLetter = function ([letter, status]) {
  return generateTag('div', letter, status);
};

const generateWord = function (letters) {
  const generatedLetters = letters.map(generateLetter).join('');
  return generateTag('div', generatedLetters, 'word');
};

const emptyRow = function (numOfCells) {
  let row = '';
  for (let index = 0; index < numOfCells; index++) {
    row += generateTag('div', '', '');
  }
  return generateTag('div', row, 'word');
};

const emptyRows = function (numOfRows) {
  const rows = [];
  for (let index = 0; index < numOfRows; index++) {
    rows.push(emptyRow(5));
  }
  return rows;
};

const gameChart = function (prevAttempts) {
  const generatedWords = prevAttempts.map(generateWord);
  const attemptsLeft = 6 - prevAttempts.length;
  const generatedEmptyRows = emptyRows(attemptsLeft);
  return generatedWords.concat(generatedEmptyRows).join('');
};

const generatePage = function (data, guess, templateAsString) {
  const message = getMessage(data, guess);
  const wordleChart = gameChart(data.guessedWords);
  let webpage = templateAsString.replace(/_GUESSED-WORDS_/, wordleChart);
  return webpage.replace(/_MESSAGE_/, message);
};

const main = function (guess, dataFile, template, wordsFile) {
  const validWords = readFile(wordsFile);
  if (!isWordValid(guess, validWords)) {
    console.log('Enter 5 letter valid word');
    return 0;
  }

  let data = readJSON(dataFile);
  const templateAsString = readFile(template);

  data = updateGameData(data, guess);
  writeJson(dataFile, data);

  const webpage = generatePage(data, guess, templateAsString);
  writeFile('./index.html', webpage);
};

const dataFile = './resources/data.json';
const template = './resources/template.html';
const wordsFile = './resources/words.txt';

main(process.argv[2], dataFile, template, wordsFile);
