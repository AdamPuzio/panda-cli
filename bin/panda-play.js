'use strict'

const { Terminal, Utility } = require('panda')

module.exports = new Terminal.Command({
  command: 'play',
  description: 'Playground',
  options: [],
  action: async function (opts) {
    this.debug('command: play')

    this.heading('Panda Playground')

    this.out('ready...')
  }
})
