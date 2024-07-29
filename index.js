import fs from 'fs/promises'; // core

import chalk from 'chalk'; // de terceiro

import criacaoNode from './criacao-node.js'; // local

console.log(chalk.rgb(102, 0, 153).bold('Estou na Vivo!'));

console.log(`Node foi criado ${criacaoNode}.`);

const data = await fs.readFile('por-que-a-vivo.json', 'utf8')
const motivos = JSON.parse(data);
motivos.forEach(item => {
  console.log(chalk.rgb(102, 0, 153).bold(item.title));
  console.log(chalk.gray.bold(item.description));
});