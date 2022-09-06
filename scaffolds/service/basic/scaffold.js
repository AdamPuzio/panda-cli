'use strict'

const Scaffold = require('../../../src/entity/scaffold')
const helpers = Scaffold.helpers
const path = require('path')

module.exports = new Scaffold({
  namespace: 'panda.scaffolds.service.basic',
  name: 'basic',
  description: 'Simple, no-frills Service',

  interface: [
    // name
    helpers.questions.name(),
    // filepath
    helpers.questions.filepath({
      default: function(answers) {
        return path.join('app', 'services', answers.name + '.service.js')
      }
    }),
    // template
    helpers.questions.template({
      choices: [
        { name: 'Empty', value: 'basic.service.js', desc: 'An empty skeleton service file with just the base structure' },
        { name: 'Example', value: 'example.service.js', desc: 'An example Service that contains sample code on how actions and methods can be used' }
      ]
    })
  ],

  async build (data) {
    this.logger.debug(`Scaffold['service'].build()`)
    const srcFile = path.join(__dirname, 'template', data.template)
    //const destFile = path.join(data.filepath.slice(0, -3))
    const destFile = data.filepath

    await this.copyScaffoldFile(srcFile, destFile, data)
  }
})