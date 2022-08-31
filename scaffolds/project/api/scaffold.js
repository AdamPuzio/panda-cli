'use strict'

const { Panda, Context, Factory, Utility, ctx } = require('panda')
const Scaffold = Panda.entity('scaffold')
const path = require('path')
const _ = require('lodash')

module.exports = new Scaffold({
  //namespace: 'panda.scaffold.project.api',
  name: 'API',
  description: 'Service-based API',

  interface: [],

  async build () {
    console.log(`Scaffold['project'].build()`)
  }
})