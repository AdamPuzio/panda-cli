'use strict'

//const { Panda, Context, Factory, Utility, ctx } = require('panda')
const Scaffold = require('../../../src/entity/scaffold')
//const helpers = Scaffold.helpers
const localHelpers = require('../helpers')
const path = require('path')

const data = {}

module.exports = new Scaffold({
  //namespace: 'panda.scaffold.command.scaffold',
  name: 'Scaffold',
  description: 'Command used to build something from a Scaffold',

  interface: [
    // parent command
    localHelpers.questions.parentCommand(),
    // command
    localHelpers.questions.command(),
    // desc
    localHelpers.questions.desc(),
    // filepath
    localHelpers.questions.filepath(),
    // entity type
    {
      type: 'string',
      name: 'entity',
      message: 'Entity Type:',
      // default: 'project',
      default: function (answers) {
        return answers.command.split(':')[0]
      }
    },
    // add in-project check
    localHelpers.questions.confirmInProject()
  ],

  async build (data) {
    this.logger.debug(`Scaffold['command'].build()`)
    const src = path.join(__dirname, 'scaffcmd.js')

    return this.copyTemplate(src, data.filepath, data, {})
  }
})