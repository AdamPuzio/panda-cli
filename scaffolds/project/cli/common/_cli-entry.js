#!/usr/bin/env node

const { Factory, Logger, Terminal } = require('panda')
const packageJson = require('../package.json')
const path = require('path')

// clear the console
Terminal.clear()

// make sure the current version of Node is valid
Terminal.versionCheck()

Terminal.cmd({
  command: '<%-command%>',
  title: '<%-title%>',
  description: '<%-description%>',
  usage: '<%-command%> [command] [options]',
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