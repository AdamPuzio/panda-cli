'use strict'

const { Panda, Context, Factory, Utility, ctx } = require('panda')
//const Scaffold = Panda.entity('scaffold')
const Scaffold = require('../../../src/entity/scaffold')
const localHelpers = require('../helpers')
const path = require('path')
const _ = require('lodash')

module.exports = new Scaffold({
  //namespace: 'panda.scaffold.project.cli',
  name: 'CLI',
  description: 'Command line utility',

  interface: [
    // command
    localHelpers.questions.projectName(),
    // desc
    localHelpers.questions.desc(),
    // command
    localHelpers.questions.command(),
    // tools & utilities
    localHelpers.questions.testTool(),
    localHelpers.questions.lintTool()
  ],

  async build (data) {
    this.logger.debug(`Scaffold['project'].build()`)
    const srcDir = path.join(__dirname, 'template')
    const destDir = data.name
    this.confirmNotExists(destDir)

    const cfg = {}
    return this.copyScaffold(srcDir, destDir, data, cfg)
  }
})