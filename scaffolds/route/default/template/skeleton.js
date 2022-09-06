const { Router } = require('panda')
const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = ''
})

module.exports = router
