'use strict'

const { Factory, Terminal } = require('panda')

module.exports = new Terminal.Command({
  command: 'uninstall',
  description: 'Uninstall a Package',
  help: `
    Usage: panda uninstall <pkg> [OPTIONS]
  `,
  arguments: [{
    name: 'pkg',
    description: 'Package to uninstall',
    defaultOption: true
  }],
  options: [],
  action: async function (args, opts) {
    this.debug('command: uninstall')

    this.heading('Uninstall a Package')

    // check to make sure we are in a Project directory
    await this.confirmInProject()

    await Factory.uninstallPackage(args.pkg, opts)
      .then((rs) => { this.success(`Successfully uninstalled ${rs.name}`) })
      .catch((err) => { this.exitError(err) })
  }
})
