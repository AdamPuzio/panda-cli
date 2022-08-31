'use strict'

const { Panda, Context, Factory, Utility, ctx } = require('panda')
const PandaScaffold = Panda.entity('scaffold')
const path = require('path')
const map = require('map-stream')
const vfs = require('vinyl-fs')
const vinylContents = require('vinyl-contents')
const helpers = require('../../scaffolds/common/helpers')

class Scaffold extends PandaScaffold {
  helpers = helpers

  async copyScaffold (source, dest, data, opts) {
    opts = {
      ...{
        destBase: ctx.cwd,
        overwrite: false
      },
      ...opts
    }
    const $this = this

    const srcPaths = [
      path.join(source, '**/*')
    ]
    const destPath = path.join(opts.destBase, dest)

    if (opts.overwrite === false) await this.confirmNotExists(destPath, `Output location already exists, can't overwrite (${destPath})`)

    const vals = {
      ...ctx,
      ...data,
      data,
      Utility,
      _: Utility._
    }

    return new Promise(function(resolve, reject) {
      vfs.src(srcPaths)
        //.pipe(map($this.fileFn))
        .pipe(map((file, cb) => {
          return $this.fileFn(file, vals, cb)
        }))
        .pipe(vfs.dest(destPath))
        .on('end', resolve)
        .on('error', reject)
    })
  }

  fileFn (file, data, cb) {
    const $this = this
    if (file.stem.startsWith('_')) {
      let stem = file.stem.replace('_', '')
      const rx = /\(([^()]*)\)/g
      const match = file.stem.match(/\(.*?\)/g) || []
      match.map(x => {
        const y = x.replace(/[()]/g, "") 
        const z = data[y] || x
        // if there's a match, replace value
        stem = stem.replace(x, z)
      })
      file.stem = stem
    }

    if (file.isDirectory()) return cb(null, file)

    vinylContents(file, async function(err, contents) {
      if (err) return cb(err)
      if (!contents) return cb()
 
      const output = await $this._template(contents.toString(), data)
      file.contents = Buffer.from(output)
      cb(null, file)
    })
  }
}

module.exports = Scaffold




