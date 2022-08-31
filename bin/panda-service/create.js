'use strict'

const { Terminal } = require('panda')

module.exports = new Terminal.Command({
  command: 'service:create',
  scaffold: true,
  description: 'Create a new Service',
  help: `
    Usage: panda service:create [OPTIONS]
  `,
  options: [],
  action: async function (opts) {
    this.debug('command: service:create')

    this.heading('Create a new Service')

    // check to make sure we are in a Project directory
    await this.confirmInProject()

    this.parseScaffold('service', opts)
      .then(() => { this.success('Service successfully created') })
      .catch((err) => {
        this.exitError(err, 'Service creation failed')
      })
  }
})
