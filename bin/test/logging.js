'use strict'

const { Terminal } = require('panda')

module.exports = new Terminal.Command({
  command: 'test:logging',
  description: 'Run logging tests',
  options: [],
  action: async function (opts) {
    this.debug('command: test:logging')

    this.heading('Test Logger Levels:')

    this.logger.out(`Current level: ${this.logger._level}`)
    this.spacer()

    const levels = Object.keys(this.logger.levels)
    this.logger.out(`Log Levels: ${levels.join(' | ')}`)
    this.spacer()
    levels.forEach((k) => {
      this.logger[k](`log level test for: ${k}`)
    })
  }
})
