const chalk = require('chalk');
const moment = require('moment');
const fs = require('fs');

moment.locale('pt');

console.log(chalk.rgb(102, 0, 153).bold('Estou Vivo!'));

const criacaoNode = moment('2009-05-27').fromNow();
console.log(`Node foi criado ${criacaoNode}.`);

fs.readFile('por-que-a-vivo.txt', 'utf8', (err, data) => {
  console.log(data); 
});
