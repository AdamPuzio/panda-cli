'use strict'

const Panda = require('panda')
const Terminal = Panda.Terminal
const Project = Panda.entity('project')
const highlight = require('cli-highlight').highlight

module.exports = new Terminal.Command({
  command: 'project:info',
  description: 'Get information about the current Project and how it will be run',
  options: [{
    option: 'json',
    alias: 'j',
    type: Boolean
  }],
  action: async function (opts) {
    //this.debug('command: project:info')

    this.heading('Project Details:')

    // check to make sure we are in a Project directory
    await this.confirmInProject()

    const project = new Project()
    await project.load('{PROJECT_PATH}/project.json')
    const info = project.info()

    // if the --json flag is set, output the JSON object
    if (opts.json) { return console.log(highlight(JSON.stringify(info, null, 2))) }

    const $this = this

    function output (base, indent = '') {
      Object.entries(base).forEach(([entity, entityObj]) => {
        console.log($this.color.bold(`${indent}  ${entity}`))
        if (entityObj.length === 0) console.log('    -- none --')
        entityObj.forEach((item) => {
          const pkg = item._pkg ? item._pkg.package : ''
          let name = item.name || item.path.split('/').pop()
          if (!item.name && pkg) name = `${indent}${pkg}:${name}`
          console.log($this.color.magenta(`${indent}    ${name}`))
          if (pkg) console.log(`${indent}      package: ${pkg}`)
          const vars = ['port', 'namespace']
          vars.forEach((i) => {
            if (item[i]) console.log(`${indent}      ${i}: ${item[i]}`)
          })
          console.log(`${indent}      path: ${item.path}`)
          if (item.config) {
            console.log(`${indent}      config:`)
            Object.entries(item.config).forEach(([i, v]) => {
              if (typeof v !== 'string') v = JSON.stringify(v)
              console.log(`${indent}        ${i}: ${v}`)
            })
          }
          if (item.files) {
            console.log(`${indent}      files:`)
            item.files.forEach((i) => {
              console.log(`${indent}        ${i}`)
            })
          }
          if (item.import) {
            console.log(`${indent}      package entities:`)
            output(item.import, `${indent}      `)
          }
        })
      })
    }
    output(info)
  }
})
