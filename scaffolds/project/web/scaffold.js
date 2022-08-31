'use strict'

const { Panda, Context, Factory, Utility, ctx } = require('panda')
const Scaffold = Panda.entity('scaffold')
const path = require('path')
const _ = require('lodash')

module.exports = new Scaffold({
  //namespace: 'panda.scaffold.project.web',
  name: 'Web App',
  description: 'Basic web server',

  interface: [
    {
      type: 'input',
      name: 'name',
      message: 'Project Name:',
      default: function (answers) {
        return Utility.slugify(`new-${ctx.label || 'panda'}-project`)
      },
      validate: async (val, answers) => {
        const check = val.length > 1 && /^[a-zA-Z0-9-_]+$/.test(val) && val === _.kebabCase(val)
        return check || 'project name must be at least 2 letters and alphanumeric (plus dash & underscore, no spaces or special characters)'
      }
    }
  ],

  async build (data) {
    console.log(`Scaffold['project'].build()`)
    const srcDir = path.join(__dirname, 'template')
    const destDir = path.join(ctx.cwd, data.name)
    //this.confirmNotExists(destDir)

    const copy = this.copy(srcDir, destDir, data, {})
    //copy.add()
    return await copy
    //const build = scaffe.generate(templateDir, outDir, { overwrite: true, variables: { name: "app" } })
  }
})