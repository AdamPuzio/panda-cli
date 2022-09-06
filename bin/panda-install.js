'use strict'

const { Factory, Terminal } = require('panda')

module.exports = new Terminal.Command({
  command: 'install',
  description: 'Install a Package',
  help: `
    Usage: panda install <pkg> [OPTIONS]
  `,
  arguments: [{
    name: 'pkg',
    description: 'Package to install',
    defaultOption: true
  }],
  options: [],
  action: async function (args, opts) {
    this.debug('command: install')

    this.heading('Install a Package')

    // check to make sure we are in a Project directory
    await this.confirmInProject()

    await Factory.installPackage(args.pkg, opts)
      .then((rs) => { this.success(`Successfully installed ${rs.name}`) })
      .catch((err) => { this.exitError(err) })
  }
})
