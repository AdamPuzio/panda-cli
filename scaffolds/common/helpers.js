'use strict'

/*
* Helper functionality for all scaffolding
*/

module.exports = {
  // list of useful regular expressions
  regex: {},

  // converts name/desc/value object to a table for lists
  tableFn (arr, cfg={}) {
    cfg = {...{
      nameField: 'name',
      descField: 'desc',
      valueField: 'value'
    }, ...cfg}
    const names = arr.map(a => a[cfg.nameField])
    const maxLength = Math.max.apply(Math, names.map(function (el) { return el.length }))
    const rs = []
    arr.forEach((i) => {
      const spacing = maxLength + 5 - i[cfg.nameField].length
      const spacer = ' '.repeat(spacing > 0 ? spacing : 0)
      const name = `${i[cfg.nameField]}${spacer}${i[cfg.descField] || ''}`
      rs.push({ name, value: i[cfg.valueField] })
    })
    return rs
  }
}