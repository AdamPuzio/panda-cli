'use strict'

const { Terminal } = require('panda')

module.exports = new Terminal.Command({
  command: 'scaffold:create',
  scaffold: true,
  description: 'Create a new Scaffold',
  help: `
    Usage: panda scaffold:create [OPTIONS]
  `,
  options: [],
  action: async function (opts) {
    this.debug('command: scaffold:create')

    this.heading('Create a new Scaffold')


    this.parseScaffold('scaffold', opts)
      .then(() => { this.success('Scaffold successfully created') })
      .catch((err) => {
        this.exitError(err, 'Scaffold creation failed')
      })
  }
})
