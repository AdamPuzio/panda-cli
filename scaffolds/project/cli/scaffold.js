'use strict'

const { Panda, Context, Factory, Utility, ctx } = require('panda')
const Scaffold = require('../../../src/entity/scaffold')
const localHelpers = require('../helpers')
const path = require('path')
const _ = require('lodash')

module.exports = new Scaffold({
  //namespace: 'panda.scaffold.project.cli',
  name: 'CLI',
  description: 'Command line utility',

  interface: [
    // project name
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
    await this.copyScaffold(srcDir, destDir, data, cfg)
    let pjson = await Factory.buildPackageJson({
      name: data.name,
      description: data.desc,
      main: `${data.name}.js`,
      scripts: {
        [data.command]: `./bin/${data.command}.js`
      },
      bin: {
        [data.command]: `./bin/${data.command}.js`
      }
    })
    pjson = await Factory.applyTools(pjson, Utility.pick(data, ['testTool', 'lintTool']))
    await Factory.writePackageJson(pjson, destDir)
    await Factory.npmInstall([], { baseDir: destDir })
    this.logger.info(`To install globally, run 'npm i -g .' from within the project directory`)
  }
})