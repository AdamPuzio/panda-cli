'use strict'

const { Terminal, Utility } = require('panda')

module.exports = new Terminal.Command({
  command: 'panda',
  description: 'This what they all been waitin\' for',
  hidden: true,
  options: [],
  action: async function (opts) {
    this.debug('command: panda')

    this.heading('Time to share my vibe right now...')

    const url = 'https://www.youtube.com/watch?v=E5ONTXHS2mM'

    Utility.openBrowser(url)
  }
})
