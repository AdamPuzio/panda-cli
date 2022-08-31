'use strict'

const { Panda, Context, Factory, Utility, ctx } = require('panda')
const Scaffold = Panda.entity('scaffold')
const path = require('path')
const _ = require('lodash')

module.exports = new Scaffold({
  //namespace: 'panda.scaffold.scaffold.default',
  name: 'Basic Scaffold',
  description: 'Barebones Scaffold',

  interface: [],

  async build (data) {
    console.log(`Scaffold['scaffold'].build()`)
    this.confirmNotExists()
  }
})