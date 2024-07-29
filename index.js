const fs = require('fs'); // core

const chalk = require('chalk'); // de terceiro

require('./criacao-node.js'); // local

console.log(chalk.rgb(102, 0, 153).bold('Estou Vivo!'));

console.log(`Node foi criado ${criacaoNode}.`);

fs.readFile('por-que-a-vivo.txt', 'utf8', (err, data) => {
  console.log(data); 
});
