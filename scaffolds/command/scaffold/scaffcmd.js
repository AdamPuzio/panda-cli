'use strict'

const { Terminal } = require('panda')

module.exports = new Terminal.Command({
  command: '<%-data.command%>',
  scaffold: true,
  description: '<%-data.desc%>',
  help: `
    Usage: <%-data.parentCommand%> <%-data.command%> [OPTIONS]
  `,
  options: [],
  action: async function (opts) {
    this.debug('command: <%-data.command%>')

    this.heading('Create a new <%-Utility.nameify(data.entity)%>')
<% if (data.confirmInProject) { %>
    // check to make sure we are in a Project directory
    await this.confirmInProject()
<% } %>

    this.parseScaffold('<%-Utility.slugify(data.entity)%>', opts)
      .then(() => { this.success('<%-Utility.nameify(data.entity)%> successfully created') })
      .catch((err) => {
        this.exitError(err, '<%-Utility.nameify(data.entity)%> creation failed')
      })
  }
})
