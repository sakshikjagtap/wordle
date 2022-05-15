const fs = require('fs');

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

const generateTag = function (tag, content, property) {
  let style = '';
  if (property) {
    style = ' class="' + property + '"';
  }
  return '<' + tag + style + '>' + content + '</' + tag + '>';
};

const readFile = filePath => fs.readFileSync(filePath, 'utf8');

const writeToJson = function (file, content) {
  fs.writeFileSync(file, JSON.stringify(content), 'utf8');
}

const writeToFile = function (file, content) {
  fs.writeFileSync(file, content, 'utf8');
}

const generateLetter = function ([letter, status]) {
  return generateTag('div', letter, status);
}

const generateWord = function (letters) {
  const generatedLetters = letters.map(generateLetter).join('');
  return generateTag('div', generatedLetters, 'word');
}

const emptyRow = function (numOfCells) {
  let row = '';
  for (let index = 0; index < numOfCells; index++) {
    row += generateTag('div', '', '');
  }
  return generateTag('div', row, 'word');
}

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

const updateGameStatus = function (data, guess) {
  if (data.word === guess || data.guessedWords.length === 6) {
    data.isGameOver = true;
  }
  return data;
};

const getMessage = function (data, guess) {
  if (data.word === guess) {
    return 'CONGRAGULATIONS!!! You got it right';
  }
  if (data.guessedWords.length === 6) {
    return 'OOPS!!! Better luck next time. Correct word was ' + data.word;
  }
  return '';
};

const isWordValid = function (word, validWords) {
  return word.length === 5 && validWords.includes(word);
};

const updateGameData = function (data, guess) {
  const wordResult = lettersValidation(data.word, guess);
  data.guessedWords.push(wordResult);

  data = updateGameStatus(data, guess);
  return data;
};

const main = function (guess, dataFile, template, wordsFile) {
  const validWords = readFile(wordsFile);
  if (!isWordValid(guess, validWords)) {
    console.log('Enter 5 letter valid word');
    return 0;
  }

  let data = JSON.parse(readFile(dataFile));
  const templateAsString = readFile(template);

  data = updateGameData(data, guess);
  const webpage = generatePage(data, guess, templateAsString);

  writeToJson(dataFile, data);
  writeToFile('./index.html', webpage);
};

const dataFile = './resources/data.json';
const template = './resources/template.html';
const wordsFile = './resources/words.txt';

main(process.argv[2], dataFile, template, wordsFile);
