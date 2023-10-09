const fs = require("fs");

function soma (a,b) {
  return a + b;
}

function lerArquivo(caminhoDoArquivo) {
  fs.readFile(caminhoDoArquivo, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}
module.exports = { soma, lerArquivo };
