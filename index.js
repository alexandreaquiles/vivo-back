const chalk = require('chalk');
const moment = require('moment');
const fs = require('fs');

moment.locale('pt');

console.log(chalk.rgb(102, 0, 153).bold('Estou Vivo!'));

const criacaoNode = moment('2009-05-27').fromNow();
console.log(`Node foi criado ${criacaoNode}.`);

console.log('----');

fs.readFile('por-que-a-vivo.txt', 'utf8', (err, data) => {
  data.split('\n').filter(linha => linha.trim().length != 0)
    .forEach((linha, i) => {
      if (i % 2 == 0) {
        console.log(chalk.rgb(102, 0, 153).bold(linha));
      } else {
        console.log(chalk.grey.bold(linha));
      }
    })
});

