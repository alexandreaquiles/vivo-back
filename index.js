import fs from 'fs'; // core

import chalk from 'chalk'; // de terceiro

import criacaoNode from './criacao-node.js'; // local

console.log(chalk.rgb(102, 0, 153).bold('Estou na Vivo!'));

console.log(`Node foi criado ${criacaoNode}.`);

let linhas = [];
const data = fs.readFileSync('por-que-a-vivo.txt', 'utf8');
linhas = data.split('\n'); 
console.log(linhas.length);
