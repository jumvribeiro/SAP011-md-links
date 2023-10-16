#!/usr/bin/env node
const {mdLinks} = require('./index.js');
const chalk = require('chalk');
const {showStatsAndValidate, showStats, showValidate, showWhithoutFlags} = require('./show-logs.js');

const path = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}
try {
  mdLinks(path, options).then((response) => {
    if (options.stats && options.validate) {
      showStatsAndValidate(response)
    } else if (options.stats) {
      showStats(response)
    } else if (options.validate) {
      showValidate(response)
    } else if (response.length === 0) {
      console.log(chalk.redBright('\nNão há links no arquivo indicado'))
    } else {
      showWhithoutFlags(response)
    }
  })}
  catch (erro) {console.log(chalk.redBright(erro.message))}