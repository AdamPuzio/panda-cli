'use strict'

const Commands = {
  // command
  'command:create': require('./bin/panda-command/create'),
  // project
  'project:create': require('./bin/panda-project/create'),
  'project:info': require('./bin/panda-project/info'),
  'project:start': require('./bin/panda-project/start'),
  //scaffold
  'scaffold:list': require('./bin/panda-scaffold/list'),
  // service
  'service:create': require('./bin/panda-service/create'),
  // test
  'test:logging': require('./bin/panda-test/logging'),
  // other
  ctx: require('./bin/panda-ctx')
}

const Scaffolds = {}

module.exports = {
  Commands,
  Scaffolds
}