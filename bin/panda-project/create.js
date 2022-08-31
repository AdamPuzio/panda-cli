'use strict'

const { Terminal } = require('panda')

module.exports = new Terminal.Command({
  command: 'project:create',
  scaffold: true,
  description: 'Create a new Project',
  arguments: [{
    name: 'name'
  }],
  options: [
    {
      name: 'scaffold'
    }
  ],
  action: async function (opts) {
    this.debug('command: project:create')

    this.heading('Create a new Project')

    // check to make sure we are NOT in a Project, Panda, or PandaCLI directory
    await this.locationTest(['notInProject', 'notInPanda'])

    this.parseScaffold('project', opts)
      .then(() => { this.success('Project successfully created') })
      .catch((err) => {
        this.exitError(err, 'Project creation failed')
      })
  }
})
