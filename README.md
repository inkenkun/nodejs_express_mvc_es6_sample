# NodeJS Express4 MySQL MVC ES6 Sample

nodejsのフレームワークexpressのMVCサンプルです。

なるべくES6で書いてます。

MySQLとSessionストレージにRedisを使っています。

REST APIなので、M(V)Cな感じ。

## Start

```
# development
npm start

# config/staging.js を読む場合
NODE_ENV=staging npm start

# config/production.js 
NODE_ENV=production npm start

```

## Sample

```
$ curl -X GET http://localhost:3005/user/1

→ {"id":1,"name":"test","tel":"090"}

$ curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"id":"id","pass":"pass"}' http://localhost:3005/login/

→ {"status":0}
```