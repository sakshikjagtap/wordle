const { lettersValidation } = require('./wordValidation.js');

const fs = require('fs');
const stringify = JSON.stringify;
const parse = JSON.parse;

const readFile = filePath => fs.readFileSync(filePath, 'utf8');

const readJSON = file => parse(fs.readFileSync(file));

const writeJson = function (file, content) {
  fs.writeFileSync(file, stringify(content), 'utf8');
};

const writeFile = function (file, content) {
  fs.writeFileSync(file, content, 'utf8');
};

const updateGameStatus = function (data, guess) {
  if (data.word === guess || data.guessedWords.length === 6) {
    data.isGameOver = true;
  }
  return data;
};

const updateGameData = function (data, guess) {
  const wordResult = lettersValidation(data.word, guess);
  data.guessedWords.push(wordResult);

  data = updateGameStatus(data, guess);
  return data;
};

exports.updateGameData = updateGameData;
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.writeJson = writeJson;
exports.readJSON = readJSON;
