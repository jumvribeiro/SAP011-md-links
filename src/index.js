const fs = require('fs')
const {extractLinks, checkStatusOfLinks, validatedList} = require('./validation.js');

function isFile(path) {
  try {
    return fs.lstatSync(path).isFile();
  } catch (error) {
    return false;
  }
}

function isDirectory(path) {
  try {
    return fs.lstatSync(path).isDirectory();
  } catch (error) { 
    return false;
  }
}

//path (caminho do arquivo ou diretório a ser analisado)
//options (um objeto que contém opções para a análise, validate e stats)

//coordena a análise do arquivo ou diretório
function mdLinks(path, options) {
  if (!isFile(path) && !isDirectory(path)) {
    throw new Error('Arquivo ou diretório não existe');
  }
   if (isDirectory(path)) {
    return fs.promises.readdir(path)
      .then(files => {
        return Promise.all(files.map((fileName) => {
          const filePath = `${path}/${fileName}`;
          return extractLinks(filePath)
            .then(result => {
              return validateOptions (options, result)
            })
        }));
      });
  }
  if (isFile(path)) {
    if (!path.endsWith('.md')) {
      throw new Error('Extensão inválida')
    } else {
      return extractLinks(path)
        .then(links => {
          return validateOptions (options, links)
        });
     }
  }
}

function validateOptions (options, links) {
  if (options.stats && options.validate) {
    return checkStatusOfLinks(links)
   } else if (options.stats) {
    return checkStatusOfLinks(links)
   } else if (options.validate) {
     return validatedList(links)
   } else {
     return links
   }
}

module.exports = {isFile, isDirectory, mdLinks};


// lib fs
//1º parâmetro: caminho do arquivo que ele vai ler
//2º parâmetro: qual é o encoding de caracteres que ele vai encontrar (ex.: UTF-8)
//3º parâmetro: função callback (erro e retorno)