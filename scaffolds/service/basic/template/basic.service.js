'use strict'

module.exports = {
  name: '<%-data.name%>',

  // any mixins that should be used
  mixins: [],

  // dependencies on other services
  dependencies: [],

  // static store, reached via this.settings
  settings: {},

  // service metadata, reached via this.metadata
  metadata: {},

  // callable/public methods of the service (accessed via broker.call('<%-data.slug%>.example'))
  actions: {},

  // private methods of this service
  methods: {},

  // subscribable events of other services
  events: {},

  // lifecycle events
  created () {},
  merged () {},
  async started () {},
  async stopped () {}
}
