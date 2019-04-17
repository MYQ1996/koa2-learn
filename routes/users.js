const router = require('koa-router')()
const Person = require('../dbs/models/person')
const Redis = require('koa-redis')
router.prefix('/users')
const Store = new Redis().client

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/addPerson',async function (ctx, next) {
  const person = new Person({
    name:ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code 
  try{
    await person.save();
    code = 0
  }catch(e){
    code = -1
  }
  ctx.body = {
    "code": code,
    msg:'成功'
  }
})

router.post('/getPerson', async function (ctx, next) {
  
  const result = await Person.findOne({
    name:ctx.request.body.name
  })

  const results = await Person.find({
    name: ctx.request.body.name
  })

  ctx.body = {
    "code": 0,
    msg: result,
    results: results
  }
})

router.post('/updatePerson', async function (ctx, next) {

  const result = await Person.where({
    name:ctx.request.body.name
  }).update({
    age:ctx.request.body.age
  })

  let code
  try {
    code = 0 
  } catch (error) {
    code = 1
  }

  ctx.body = {
    "code": code,
    msg: "成功",
  }
})

router.get('/fix', async function (ctx, next) {
  const st = await Store.hset('fix',"name",Math.random());
  ctx.body = {
    code:0
  }
})

module.exports = router
