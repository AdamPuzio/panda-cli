'use strict'

const Scaffold = require('../../../src/entity/scaffold')
const helpers = Scaffold.helpers
const path = require('path')

module.exports = new Scaffold({
  namespace: 'panda.scaffolds.route.default',
  name: 'default',
  description: 'Basic Route',

  interface: [
    {
      type: 'input',
      name: 'route',
      message: 'Base Route (e.g. admin or path/to/route):',
      default: '/'
    },
    {
      type: 'input',
      name: 'filename',
      message: 'Filename (no relevance to routing):',
      default: 'index'
    },
    // template
    helpers.questions.template({
      choices: [
        { name: 'Empty', value: 'skeleton.js', desc: 'An empty skeleton route' },
        //{ name: 'Example', value: 'example.js', desc: 'An example Route with sample code' }
      ]
    })
  ],

  async build (data) {
    this.logger.debug(`Scaffold['route'].build()`)
    const srcFile = path.join(__dirname, 'template', data.template)
    //const destFile = path.join(data.filepath.slice(0, -3))
    const destFile = path.join(
      'app',
      'routes',
      data.route.split('/').join(path.sep),
      data.filename.slice(-3) == '.js' ? data.filename : data.filename + '.js'
    )

    await this.copyScaffoldFile(srcFile, destFile, data)
  }
})