'use strict'

const { Panda, Context, Factory, Utility, ctx } = require('panda')
//const Scaffold = Panda.entity('scaffold')
const Scaffold = require('../../../src/entity/scaffold')
const localHelpers = require('../helpers')
const path = require('path')
const _ = require('lodash')

module.exports = new Scaffold({
  //namespace: 'panda.scaffold.project.web',
  name: 'Web App',
  description: 'Basic web server',

  interface: [
    // project name
    localHelpers.questions.projectName(),
    // desc
    localHelpers.questions.desc(),
    localHelpers.questions.port(),
    // tools & utilities
    localHelpers.questions.buildTool(),
    localHelpers.questions.testTool(),
    localHelpers.questions.cssTool(),
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
      main: `index.js`
    })
    pjson = await Factory.applyTools(pjson, Utility.pick(data, ['testTool', 'lintTool', 'cssTool', 'buildTool']))
    await Factory.writePackageJson(pjson, destDir)
    await Factory.npmInstall([], { baseDir: destDir })
    const prjson = {
      apps: [
        { app: 'web', port: data.port }
      ],
      components: [
        {
          app: 'web',
          path: '{PROJECT_PATH}/app/ui/components'
        }
      ],
      packages: [],
      routes: [
        {
          app: 'web',
          path: '{PROJECT_PATH}/app/routes'
        }
      ],
      services: [
        {
          app: 'web',
          path: '{PROJECT_PATH}/app/services'
        }
      ],
      statics: [
        {
          app: 'web',
          path: '{PROJECT_PATH}/app/static'
        }
      ],
      views: [
        {
          app: 'web',
          path: '{PROJECT_PATH}/app/ui/views'
        }
      ]
    }
    await Factory.writeProjectJson(prjson, destDir)
    this.logger.info(`Options to run your application:`)
    this.logger.info(`  1. run 'node index' to run it directly`)
    this.logger.info(`  2. run 'panda project:start' to run the development server`)
  }
})