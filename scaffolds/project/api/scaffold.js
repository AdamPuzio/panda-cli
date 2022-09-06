'use strict'

const { Panda, Context, Factory, Utility, ctx } = require('panda')
//const Scaffold = Panda.entity('scaffold')
const Scaffold = require('../../../src/entity/scaffold')
const helpers = Scaffold.helpers
const path = require('path')
const _ = require('lodash')

module.exports = new Scaffold({
  //namespace: 'panda.scaffold.project.api',
  name: 'API',
  description: 'API server',

  interface: [
    // project name
    helpers.questions.name({
      message: 'Project Name:',
      default: function (answers) {
        return Utility.slugify(`new-${ctx.label || 'panda'}-project`)
      }
    }),
    // desc
    helpers.questions.desc(),
    helpers.questions.port({default: 6000}),
    // tools & utilities
    helpers.questions.testTool(),
    helpers.questions.lintTool()
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
    pjson = await Factory.applyTools(pjson, Utility.pick(data, ['testTool', 'lintTool']))
    await Factory.writePackageJson(pjson, destDir)
    await Factory.npmInstall([], { baseDir: destDir })
    const prjson = {
      apps: [
        { 
          app: 'api', 
          port: data.port,
          config: {
            path: '/api',
            whitelist: []
          }
        }
      ],
      components: [],
      packages: [],
      routes: [],
      services: [
        {
          app: 'api',
          path: '{PROJECT_PATH}/app/services'
        }
      ],
      statics: [],
      views: []
    }
    await Factory.writeProjectJson(prjson, destDir)
    this.logger.info(`Options to run your application:`)
    this.logger.info(`  1. run 'node index' to run it directly`)
    this.logger.info(`  2. run 'panda project:start' to run the development server`)
  }
})