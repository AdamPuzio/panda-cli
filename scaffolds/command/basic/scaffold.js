'use strict'

const { Factory } = require('panda')
const Scaffold = require('../../../src/entity/scaffold')
const helpers = Scaffold.helpers
const path = require('path')

module.exports = new Scaffold({
  namespace: 'panda.scaffolds.command.basic',
  name: 'Basic',
  description: 'Simple CLI Command',

  interface: [
    // parent command
    helpers.questions.parentCommand(),
    // command
    helpers.questions.command(),
    // desc
    helpers.questions.desc(),
    // filepath
    helpers.questions.filepath({
      default: function (answers) {
        const packageJson = Factory.readPackageJsonSync(null, { onFail: 'empty' })
        const binDir = path.dirname(packageJson.bin[answers.parentCommand])
        const baseName = answers.command
        const filename = `${answers.parentCommand}-${baseName}.js`
        return path.join(binDir, filename)
      }
    }),
    // add in-project check
    helpers.questions.confirmInProject()
  ],

  async build (data) {
    this.logger.debug(`Scaffold['command'].build()`)
    const src = path.join(__dirname, 'basic.js')

    return this.copyTemplate(src, data.filepath, data, {})
  }
})