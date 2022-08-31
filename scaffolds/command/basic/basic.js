'use strict'

const { Terminal } = require('panda')

module.exports = new Terminal.Command({
  command: '<%-data.command%>',
  description: '<%-data.desc%>',
  help: `
    Usage: <%-data.parentCommand%> <%-data.command%> [OPTIONS]
  `,
  options: [],
  action: async function (opts) {
    this.debug('command: <%-data.command%>')

    this.heading('<%-data.desc%>')
<% if (data.confirmInProject) { %>
    // check to make sure we are in a Project directory
    await this.confirmInProject()    
<% } %>
  }
})
