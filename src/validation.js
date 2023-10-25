const fs = require('fs')
const chalk = require("chalk");

function extractLinks(filePath) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  return fs.promises.readFile(filePath, 'utf-8')
    .then((text) => {
      const captures = [...text.matchAll(regex)];
      const results = captures.map((capture) => ({
        file: filePath,
        href: capture[2],
        text: capture[1],
      }));
      return results;
    })
    .catch((error) => {throw new Error(chalk.red(error.code, 'Não existe arquivo no diretório indicado'))});
}

function checkStatus(listOfURLs) {
  return Promise.all(
    listOfURLs.map((url) => {
      return fetch(url)
      .then(response => {
        if (response.ok) {
          return `${chalk.green('✅ OK')} | ${chalk.green(response.status)}`
        } else {
          return `${chalk.red('❌ FAIL')} | ${chalk.red(response.status)}`
        }
      })
      .catch(error => {
        if (error.cause.code === 'ENOTFOUND') {
          return chalk.red('O link não foi encontrado');
        } else {
          return chalk.red('Ocorreu algum erro');
        }
      })
    })
  )
}

function validatedList (listOfLinks) {
  return checkStatus(listOfLinks.map((targetLink) => targetLink.href))
  .then((status) => {
    return listOfLinks.map((objeto, indice) => ({
      ...objeto,
      status: status[indice]
    }));
  });
}

function checkStatusOfLinks (listOfLinks) {
  const totalLinks = listOfLinks.length;
  const uniqueLinks = new Set(listOfLinks.map((targetLink) => targetLink.href)).size;

  return checkStatus(listOfLinks.map((targetLink) => targetLink.href))
  .then((linkStatus) => {
    const brokenLinks = linkStatus.filter(status => status.startsWith(chalk.red('❌ FAIL')) || status.startsWith(chalk.red('O link não foi encontrado')) || status.startsWith(chalk.red('Ocorreu algum erro'))).length;
    return {totalLinks, uniqueLinks, brokenLinks};
  })
}

module.exports = {extractLinks, checkStatus, validatedList, checkStatusOfLinks}