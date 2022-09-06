'use strict'

const { Scaffold } = require('panda')
const helpers = Scaffold.helpers

module.exports = new Scaffold({
  namespace: '<%-data.namespace%>',
  name: '<%-data.name%>',
  description: '<%-data.desc%>',

  interface: [
    // name
    helpers.questions.name()
  ],

  async build (data) {
    this.logger.debug(`Scaffold['<%-data.entity%>'].build()`)
    const srcDir = path.join(__dirname, 'template')
    const destDir = path.join('app', '<%-data.entity%>s', data.name)

    await this.copy(srcDir, destDir)
  }
})