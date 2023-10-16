const chalk = require('chalk');

function showStatsAndValidate(response) {
    if (Array.isArray(response)) {
      response.map(({totalLinks, uniqueLinks, brokenLinks}) => {
        console.log(chalk.black.yellowBright(`\nEstatísticas totais dos links:\n${chalk.greenBright('\nLinks totais:')} ${chalk.greenBright(totalLinks)}\n${chalk.magentaBright('Links únicos:')} ${chalk.magentaBright(uniqueLinks)}\n${chalk.redBright('Links quebrados:')} ${chalk.redBright(brokenLinks)}`))
      })
    } else {
      console.log(chalk.yellowBright(`\nEstatísticas totais dos links:\n${chalk.greenBright('\nLinks totais:')} ${chalk.greenBright(response.totalLinks)}\n${chalk.magentaBright('Links únicos:')} ${chalk.magentaBright(response.uniqueLinks)}\n${chalk.redBright('Links quebrados:')} ${chalk.redBright(response.brokenLinks)}`))
    }
}
  
function showStats(response) {
    if(Array.isArray(response)) {
      response.map(({totalLinks, uniqueLinks}) => {
        console.log(chalk.black.bgGreenBright(`\nEstatísticas dos links: \n${chalk.greenBright('\nLinks totais:')} ${chalk.greenBright(totalLinks)} \n${chalk.magentaBright('Links únicos:')} ${chalk.magentaBright(uniqueLinks)}`))
      })
    } else {
      console.log(chalk.yellow(`\nEstatísticas dos links: \n${chalk.greenBright('\nLinks totais:')} ${chalk.greenBright(response.totalLinks)}\n${chalk.magentaBright('Links únicos:')} ${chalk.magentaBright(response.uniqueLinks)}`))
    }
  }
  
function showValidate(response) {
    if(response.every((item) => Array.isArray(item))) {
      response.forEach((item) => {
        console.log(chalk.black.bgGreenBright('\nLista de links válidos:')),
        item.map(({text, href, file, status}) => console.log(`${chalk.greenBright(file)} | ${chalk.magentaBright(text)} | ${chalk.blueBright(href)} | ${status} `))         
      })
    } else {
      console.log(chalk.black.bgGreenBright('\nLista de links válidos:')),
      response.map(({text, href, file, status}) => console.log(`${chalk.greenBright(file)} | ${chalk.magentaBright(text)} | ${chalk.blueBright(href)} | ${status} `))         
    }
}
  
function showWhithoutFlags(response) {
    if(response.every((item) => Array.isArray(item) || !item)) {
      response.forEach((item) => {
        //console.log(item)
                  //chalk.yellow(fileName)),
        if (item.length === 0) {
            console.log(chalk.redBright(`\nNão há links no arquivo`))
        } else {
            console.log(chalk.black.bgGreenBright('\nLista de links:'))
            item.map(({text, href, file}) => console.log(`\n texto: ${chalk.magentaBright(text)} \n link: ${chalk.blueBright(href)} \n diretório: ${chalk.greenBright(file)}`));
        }
      })
    } else {
      console.log(chalk.black.bgGreenBright('\nLista de links:')),
      response.map(({text, href, file}) => console.log(`\n texto: ${chalk.magentaBright(text)} \n link: ${chalk.blueBright(href)} \n diretório: ${chalk.greenBright(file)}`));
    }
}

module.exports = {showStatsAndValidate, showStats, showValidate, showWhithoutFlags}