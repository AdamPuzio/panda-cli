'use strict'

/*
* Helper functionality for Command scaffolding
*/

const { Factory } = require('panda')
const path = require('path')
const packageJson = Factory.readPackageJsonSync(null, { onFail: 'empty' })

module.exports = {
  questions: {

    // find a list of commands in package.json bin
    parentCommand: (cfg={}) => {
      return {...{
        type: 'list',
        name: 'parentCommand',
        message: 'Parent Command:',
        when: function (answers) {
          const keys = Object.keys(packageJson.bin || {})
          if (keys.length === 1) answers.parentCommand = keys[0]
          return keys.length > 1
        },
        choices: function (answers) {
          const bin = []
          Object.keys(packageJson.bin).forEach(k => {
            bin.push({
              name: k,
              value: k
            })
          })
          return bin
        }
      }, ...cfg}
    },

    // basic input for command name
    command: (cfg={}) => {
      return {...{
        type: 'input',
        name: 'command',
        message: 'Command:',
        validate: async (val, answers) => {
          const check = val.length > 1 && /^[a-zA-Z0-9-:_]+$/.test(val)
          return check || 'command must be at least 2 letters and alphanumeric (plus dash, underscore or colon; no spaces or special characters)'
        }
      }, ...cfg}
    },

    // simple text description
    desc: (cfg={}) => {
      return {...{
        type: 'input',
        name: 'desc',
        message: 'Description:'
      }, ...cfg}
    },

    // filepath relative to selected parent command
    filepath: (cfg={}) => {
      return {...{
        type: 'input',
        name: 'filepath',
        message: 'File Path:',
        default: function (answers) {
          const binDir = path.dirname(packageJson.bin[answers.parentCommand])
          const baseName = answers.command.replace(':', path.sep)
          const filename = `${answers.parentCommand}-${baseName}.js`
          return path.join(binDir, filename)
        }
      }, ...cfg}
    },

    // yes/no to add an in-project check
    confirmInProject: (cfg={}) => {
      return {...{
        type: 'confirm',
        name: 'confirmInProject',
        message: 'Add in-Project check?'
      }, ...cfg}
    },

    // empty template function
    fn: (cfg={}) => {
      return {...{}, ...cfg}
    }
  }
}