'use strict'

/*
* Helper functionality for Command scaffolding
*/

const { Utility, ctx } = require('panda')
const path = require('path')
//const packageJson = require(path.join(ctx.cwd, 'package.json'))

module.exports = {
  questions: {

    // find a list of commands in package.json bin
    projectName: (cfg={}) => {
      return {...{
        type: 'input',
        name: 'name',
        message: 'Project Name:',
        default: function (answers) {
          return Utility.slugify(`new-${ctx.label || 'panda'}-project`)
        },
        validate: async (val, answers) => {
          const check = val.length > 1 && /^[a-zA-Z0-9-_]+$/.test(val) && val === Utility.slugify(val)
          return check || 'project name must be at least 2 letters and alphanumeric (plus dash & underscore, no spaces or special characters)'
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

    // port
    port: (port, cfg={}) => {
      if (!port) port = 5000
      return {...{
        type: 'input',
        name: 'port',
        message: 'Port:',
        default: port,
        validate: async (val, answers) => {
          const test = /^\d+$/.test(val)
          if (test) answers.port = parseInt(val)
          return test
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

    testTool: (cfg={}) => {
      return {...{
        type: 'list',
        name: 'testTool',
        message: 'Testing Framework',
        choices: [
          { name: '--none--', value: null },
          { name: 'Jest', value: 'jest' },
          { name: 'Mocha', value: 'mocha' }
        ]
      }, ...cfg}
    },

    buildTool: (cfg={}) => {
      return {...{
        type: 'list',
        name: 'buildTool',
        message: 'Build Tool',
        choices: [
          { name: '--none--', value: null },
          { name: 'Webpack', value: 'webpack' },
          { name: 'Gulp', value: 'gulp' },
          { name: 'Grunt', value: 'grunt' }
        ]
      }, ...cfg}
    },

    cssTool: (cfg={}) => {
      return {...{
        type: 'list',
        name: 'cssTool',
        message: 'CSS Preprocessor',
        choices: [
          { name: '--none--', value: null },
          { name: 'SASS', value: 'sass' },
          { name: 'LESS', value: 'less' }
        ]
      }, ...cfg}
    },

    lintTool: (cfg={}) => {
      return {...{
        type: 'list',
        name: 'lintTool',
        message: 'Linter',
        choices: [
          { name: '--none--', value: null },
          { name: 'JSLint', value: 'jslint' },
          { name: 'ESLint', value: 'eslint' },
          { name: 'StandardJS', value: 'standard' },
          { name: 'JSHint', value: 'jshint' }
        ]
      }, ...cfg}
    },

    // empty template function
    fn: (cfg={}) => {
      return {...{}, ...cfg}
    }
  }
}
