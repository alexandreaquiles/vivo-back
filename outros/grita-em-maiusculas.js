const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', line => {
  console.log(`Gritando: ${line.toUpperCase()}`);
});
