'use strict'

const { Terminal } = require('panda')

module.exports = new Terminal.Command({
  command: 'play',
  description: 'Playground',
  hidden: true,
  options: [],
  action: async function (opts) {
    this.debug('command: play')

    this.heading('Panda Playground')

    this.out('ready...')

  }
})

