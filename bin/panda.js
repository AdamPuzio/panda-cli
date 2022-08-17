#!/usr/bin/env node

const { Logger, Terminal } = require('panda')
const packageJson = require('../package.json')

const color = Terminal.color
const formats = Logger.getFormats()
const levels = Logger.getLevels()

// clear the console
Terminal.clear()

// make sure the current version of Node is valid
Terminal.versionCheck()

Terminal.cmd({
  command: 'panda',
  title: 'Panda CLI Utility',
  description: 'Panda Development Framework CLI',
  help: `tips:
    - to run in debug mode, run: ${color.green('panda project:start --debug')}
    - change log format: ${color.green('panda project:start --log-format [format]')}
    .    formats: ${color.blue(formats.join(', '))}
    - set log level: ${color.green('panda project:start --log-level [level]')}
    .    levels: ${color.blue(levels.join(', '))}
    `,
  usage: 'panda [command] [options]',
  version: packageJson.version,
  arguments: [
    {
      name: 'command',
      subcommand: true
    }
  ],
  options: [
    {
      option: 'help',
      alias: 'h',
      type: Boolean,
      description: 'Display help',
      group: 'global'
    },
    {
      option: 'version',
      alias: 'v',
      type: Boolean,
      description: 'Output the version number',
      group:'global'
    },
    {
      option: 'debug',
      alias: 'd',
      type: Boolean,
      description: 'Run in debug mode (add library name to debug for just that lib)',
      group: 'global'
    },
    {
      option: 'log-level',
      type: String,
      description: 'Set the log level',
      group: 'logging'
    },
    {
      option: 'log-format',
      type: String,
      description: 'Set the logging output format',
      group: 'logging'
    }
  ],
  subcommands: require('./commands.json')
}).parse()