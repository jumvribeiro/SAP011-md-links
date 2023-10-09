const { soma, lerArquivo } = require('./index.js');
const chalk = require ('chalk');

const resultado = soma (1, 3);

console.log(chalk.bgRed("A soma é: "),chalk.blue(resultado));

const caminhoArquivo = process.argv[2];
lerArquivo(caminhoArquivo)
.then((conteudoArquivo) => {
    console.log(chalk.bgGrey(conteudoArquivo))
});

const inputs = process.argv
console.log (inputs);
