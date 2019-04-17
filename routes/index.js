const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.cookies.set('pvid',Math.random())
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/setCookie', async (ctx, next) => {
  ctx.cookies.set('pvid', Math.random())
  await ctx.render('index', {
    title: '保存成功'
  })
})

router.get('/getCookie', async (ctx, next) => {
  let cookie = ctx.cookies.get('pvid');
  await ctx.render('index', {
    title: cookie
  })
})

router.get('/testAsync',async(ctx) => {
  
  console.log('start',new Date().getTime());

  const a = await new Promise((resolve, reject) => {
    console.log('starta', new Date().getTime());
    setTimeout(() => {
      resolve('a');
    }, 1000);
  });

  const b = await Promise.resolve(123)
  ctx.body = {
    a,
    b
  }

})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
