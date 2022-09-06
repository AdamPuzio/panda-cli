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
  actions: {

    get: {
      params: {
        id: { type: 'string', optional: false }
      },
      async handler (ctx) {
        return await this.getById(ctx.params.id)
      }
    },

    set: {
      params: {
        id: { type: 'string', optional: false },
        value: { type: 'object', optional: false }
      },
      async handler (ctx) {
        return await this.setItem(ctx.params.id, ctx.params.value)
      }
    }
  },

  // private methods of this service
  methods: {
    async getById (id) {},

    async setItem (id, value) {}
  },

  // subscribable events of other services
  events: {},

  // lifecycle events
  created () {},
  merged () {},
  async started () {},
  async stopped () {}
}
