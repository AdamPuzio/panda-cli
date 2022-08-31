'use strict'

const { Terminal } = require('panda')

module.exports = new Terminal.Command({
  command: 'command:create',
  scaffold: true,
  description: 'Create a new Command',
  arguments: [{
    name: 'name'
  }],
  options: [
    {
      name: 'scaffold',
      description: 'Provide a specific Scaffold to use'
    }
  ],
  action: async function (opts) {
    this.debug('command: command:create')

    this.heading('Create a new Command')

    // check to make sure we are in a Project, Panda, or PandaCLI directory
    await this.locationTest(['inProject', 'inPanda', 'inPackage'], { operator: 'OR' })

    this.parseScaffold('command', opts)
      .then(() => { this.success('Command successfully created') })
      .catch((err) => {
        this.exitError(err, 'Command creation failed')
      })
  }
})
