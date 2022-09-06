'use strict'

const Commands = {
  // command
  'command:create': require('./bin/panda-command/create'),
  // project
  'project:create': require('./bin/panda-project/create'),
  'project:info': require('./bin/panda-project/info'),
  'project:start': require('./bin/panda-project/start'),
  // route
  'route:create': require('./bin/panda-route/create'),
  // scaffold
  'scaffold:create': require('./bin/panda-scaffold/create'),
  'scaffold:list': require('./bin/panda-scaffold/list'),
  // service
  'service:create': require('./bin/panda-service/create'),
  // test
  'test:logging': require('./bin/panda-test/logging'),
  // other
  ctx: require('./bin/panda-ctx'),
  install: require('./bin/panda-install'),
  uninstall: require('./bin/panda-uninstall')
}

const Scaffolds = {
  Command: {
    basic: require('./scaffolds/command/basic/scaffold'),
    scaffold: require('./scaffolds/command/scaffold/scaffold')
  },
  Project: {
    api: require('./scaffolds/project/api/scaffold'),
    cli: require('./scaffolds/project/cli/scaffold'),
    web: require('./scaffolds/project/web/scaffold')
  },
  Route: {
    default: require('./scaffolds/route/default/scaffold')
  },
  Scaffold: {
    default: require('./scaffolds/scaffold/default/scaffold')
  },
  Service: {
    basic: require('./scaffolds/service/basic/scaffold')
  }
}

module.exports = {
  Commands,
  Scaffolds,

  Scaffold: require('./src/entity/scaffold')
}