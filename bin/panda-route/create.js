'use strict'

const { Terminal } = require('panda')

module.exports = new Terminal.Command({
  command: 'route:create',
  scaffold: true,
  description: 'Create a new Route',
  help: `
    Usage: panda route:create [OPTIONS]
  `,
  options: [],
  action: async function (opts) {
    this.debug('command: route:create')

    this.heading('Create a new Route')

    // check to make sure we are in a Project directory
    await this.confirmInProject()

    this.parseScaffold('route', opts)
      .then(() => { this.success('Route successfully created') })
      .catch((err) => {
        this.exitError(err, 'Route creation failed')
      })
  }
})
