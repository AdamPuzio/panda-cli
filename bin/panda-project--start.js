'use strict'

const { Panda, Hub, Terminal, Logger } = require('panda')

const color = Terminal.color
const formats = Logger.getFormats()
const levels = Logger.getLevels()

module.exports = new Terminal.Command({
  command: 'project:start',
  description: 'Run all applications and services for a project',
  help: `tips:
    - to run in debug mode, run: ${color.green('panda project:start --debug')}
    - change log format: ${color.green('panda project:start --log-format [format]')}
    .    formats: ${color.blue(formats.join(', '))}
    - set log level: ${color.green('panda project:start --log-level [level]')}
    .    levels: ${color.blue(levels.join(', '))}
    `,
  options: [
    {
      option: 'apps',
      alias: 'a',
      description: 'a list of apps to run (not yet implemented)',
      type: String,
      multiple: true
    },
    {
      option: 'services',
      alias: 's',
      description: 'a list of services to run (not yet implemented)',
      type: String,
      multiple: true
    },
    {
      option: 'no-services',
      description: 'run without any services (not yet implemented)',
      type: Boolean
    }
  ],
  action: async function (opts) {
    this.debug('command: project:start')

    this.heading('Running the current Project')

    this.out(color.dim(`tip: use --help flag to see command functionality`))
    this.spacer()

    // check to make sure we are in a Project directory
    await this.confirmInProject()

    await Hub.load('{PROJECT_PATH}/project.json')
    await Hub.add('service', 'component')
    await Hub.add('service', 'project')
    await Hub.run()
  }
})
