# koa2基础

* koa-generator
* 安装
```
npm install -g koa-generator
```
* <br />
* 创建项目
```
koa2 project // 普通模板引擎
koa2 -e project // ejs模板引擎
```
* <br />
* 安装依赖
* <br />
```
npm i 
```
* <br />
* 运行
* <br />
```
DEBUG=koa2-learn:* npm start
```
* <br />
* 服务端脚本
* <br />
```
npm run dev
```
* <br />
* async和await语法
* 异步的概念
* 等待一个任务完成后完成
* <br />
* 理解async和await
* <br />
* 声明一个await，外部必须由async
* <br />
```
const a = await A;
const c = await B;
const c = await C;

// a等待b，b等待c
```
* <br />
```javascript
router.get('/testAsync',async(ctx) => {
  
  console.log('start',new Date().getTime());

  const a = await new Promise((resolve, reject) => { // 会一直等待
    console.log('starta', new Date().getTime());
    setTimeout(() => {
      resolve('a');
    }, 1000);
  });

  ctx.body = {
    a
  }

})

/* 获得数据
  {
    "a": "a"
  }
*/

/* 如果没有await
  {
    "a": {}
  }
*/
```
* <br />
* koa2中间件
* ![image.png](https://cdn.nlark.com/yuque/0/2019/png/271124/1554955092065-1a3dda27-108a-4c3f-b1d6-864caf8fdf89.png#align=left&display=inline&height=198&name=image.png&originHeight=396&originWidth=732&size=128902&status=done&width=366)<br />
* <br />
* 新建中间件 middleware
* 新建 koa-py.js
* <br />
```javascript
function pv(ctx) {
    global.console.log(ctx.path)
}

module.exports=function(){
    return async function(ctx,next){
        pv(ctx)
        await next()
    }
}
```
* <br />
* koa2-learn/app.js
* <br />
```javascript
const py = require('./middleware/koa-py'

app.use(py())
```
* <br />
* <br />
* <br />
* request 请求
* response  响应
* <br />
* <br />
* <br />
* ko2路由
* <br />
```javascript
const router = require('koa-router')() //调用router中间件

router.prefix('/users') // 路由写带users

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

```
* <br />
* <br />
* cookie
* <br />
```javascript
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
```
* <br />

# redis

客户端用cookie<br />服务器用session

当你用户比较多的情况下，就要存储数据库了redis

<a name="c48e4911"></a>
### 1、使用brew命令安装redis
brew install redis
<a name="b32087cc"></a>
### 2、启动redis
后台方式启动，brew services start redis。这样启动的好处是把控制台关掉后，redis仍然是启动的。当然，如果没有这样的需求，也可以这样启动<br />redis-server /usr/local/etc/redis.conf
<a name="8ccee0f1"></a>
### 3、关闭redis
brew services stop redis
<a name="a33d1a17"></a>
### 4、使用控制台连接redis
redis-cli<br />redis-cli -h 127.0.0.1 -p  


> npm i koa-generic-session koa-redis


```javascript
const session = require('koa-generic-session')

const Redis = require('koa-redis')

app.keys=['keys','keyskeys']

app.use(session({

	store:new Redis()

}))
```


> redis-cli

keys *

get fix<br />hget fix name

<a name="a82d4b29"></a>
### 5、增加接口形式的调用

```
router.get('/fix', async function (ctx, next) {
  const st = await Store.hset('fix',"name",Math.random());
  ctx.body = {
    code:0
  }
})
```


