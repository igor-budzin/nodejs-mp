const repl = require('repl');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


repl.start().context.getRandomNumber = getRandomNumber;
