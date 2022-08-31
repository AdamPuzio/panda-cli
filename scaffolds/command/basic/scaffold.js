'use strict'

//const { Panda, Context, Factory, Utility, ctx } = require('panda')
//const Scaffold = Panda.entity('scaffold')
const Scaffold = require('../../../src/entity/scaffold')
//const helpers = Scaffold.helpers
const localHelpers = require('../helpers')
const path = require('path')

const data = {}

module.exports = new Scaffold({
  //namespace: 'panda.scaffold.command.basic',
  name: 'Basic',
  description: 'Simple CLI Command',

  interface: [
    // parent command
    localHelpers.questions.parentCommand(),
    // command
    localHelpers.questions.command(),
    // desc
    localHelpers.questions.desc(),
    // filepath
    localHelpers.questions.filepath(),
    // add in-project check
    localHelpers.questions.confirmInProject()
  ],

  async build (data) {
    this.logger.debug(`Scaffold['command'].build()`)
    const src = path.join(__dirname, 'basic.js')

    return this.copyTemplate(src, data.filepath, data, {})
  }
})