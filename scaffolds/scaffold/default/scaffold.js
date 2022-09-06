'use strict'

const { Utility } = require('panda')
const Scaffold = require('../../../src/entity/scaffold')
const helpers = Scaffold.helpers
const path = require('path')
const _ = require('lodash')

module.exports = new Scaffold({
  namespace: 'panda.scaffold.scaffold.default',
  name: 'Basic Scaffold',
  description: 'Barebones Scaffold',

  interface: [
    // entity type
    helpers.questions.entity(),
    // scaffold name
    helpers.questions.name({
      default: 'default'
    }),
    // scaffold display name
    helpers.questions.displayName({
      default: function (answers) {
        return Utility.nameify(answers.name)
      }
    }),
    // desc
    helpers.questions.desc(),
    // namespace
    helpers.questions.namespace()
  ],

  async build (data) {
    this.logger.debug(`Scaffold['scaffold'].build()`)
    const srcDir = path.join(__dirname, 'template')
    const destDir = path.join('scaffolds', data.entity, data.name)
    this.confirmNotExists(destDir)

    const cfg = {}
    await this.copyScaffold(srcDir, destDir, data, cfg)
  }
})