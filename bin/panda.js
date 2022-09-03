#!/usr/bin/env node

const { Factory, Logger, Terminal } = require('panda')
const packageJson = require('../package.json')
const path = require('path')
const childProcess = require('child_process')
const boxen = require('boxen')

const color = Terminal.color
const formats = Logger.getFormats()
const levels = Logger.getLevels()

Factory.setScaffoldSource(path.join(__dirname, '../scaffolds'))

// clear the console
Terminal.clear()

// make sure the current version of Node is valid
Terminal.versionCheck()

// Check if update is available
// ToDo: add internal command to update
const latest = childProcess.execSync(`npm show ${packageJson.name} version`, {}).toString().trim()
if (packageJson.version !== latest) {
  const cmd = `npm update -g ${packageJson.name}`
  const msg = color.blue(`
  An update is available (${latest})
  To upgrade, run: ${color.green(cmd)}
  `)
  console.log(boxen(msg, {padding: 2, margin: 1, borderStyle: 'double', textAlignment: 'left'}))
}

Terminal.cmd({
  command: 'panda',
  title: 'Panda CLI Utility',
  description: 'Panda Development Framework CLI',
  help: `
    Usage: panda <command> [OPTIONS]
    Options:
      --debug STRING                    Run debug mode
      --log-level STRING                Set the log level
      --log-format STRING               Set the logging output format
      -v, --version BOOLEAN             Show version
      --help BOOLEAN                    Show this help
  `,
  helpAdd: `tips:
    - to run in debug mode, run: ${color.green('panda project:start --debug')}
    - change log format: ${color.green('panda project:start --log-format [format]')}
    .    formats: ${color.blue(formats.join(', '))}
    - set log level: ${color.green('panda project:start --log-level [level]')}
    .    levels: ${color.blue(levels.join(', '))}
    `,
  version: packageJson.version,
  arguments: '<command>',
  /*arguments: [
    {
      name: 'command',
      subcommand: true
    }
  ],*/
  options: [
    {
      name: 'help',
      alias: 'h',
      type: Boolean,
      description: 'Display help',
      group: 'global'
    },
    {
      name: 'version',
      alias: 'v',
      type: Boolean,
      description: 'Output the version number',
      group:'global'
    },
    {
      name: 'debug',
      alias: 'd',
      type: Boolean,
      description: 'Run in debug mode (add library name to debug for just that lib)',
      group: 'global'
    },
    {
      name: 'log-level',
      type: String,
      description: 'Set the log level',
      group: 'logging'
    },
    {
      name: 'log-format',
      type: String,
      description: 'Set the logging output format',
      group: 'logging'
    }
  ]
}).parse()