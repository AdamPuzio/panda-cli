'use strict'

const { Terminal, Factory } = require('panda')

module.exports = new Terminal.Command({
  command: 'scaffold:list',
  description: 'Get a list of available scaffolds to build',
  arguments: [{
    name: 'entity',
    description: 'Filter by a single entity type',
    defaultOption: true
  }],
  options: [],

  action: async function (args, opts) {
    this.debug('command: scaffold:list')

    this.heading('Scaffolds:')

    const scaffoldList = await Factory.getScaffoldList(args.entity)
    scaffoldList.sort((a, b) => a.path.localeCompare(b.path))

    const output = Terminal.groupTable(scaffoldList, {
      columns: {
        path: 'Scaffold',
        name: 'Name',
        description: 'Description'
      },
      groupBy: 'type'
    })
  }
})
