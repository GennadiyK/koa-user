/*
 REST-сервис для юзеров на Koa.JS + Mongoose
  User имеет уникальный email, а также даты создания и модификации и имя displayName.
 GET /users/:id - получить юзера по id, например: /users/57ffe7300b863737ddfe9a39
 GET /users - получить массив юзеров
 POST /users - создать пользователя
 Метод POST позволяет указать только email и displayName (нельзя при создании юзера указать его _id)
 PATCH /users/:id - модифицировать пользователя
 Метод PATCH позволяет поменять только email и displayName (нельзя при создании юзера указать его _id)
 DELETE /users/:id - удалить пользователя
 Если юзера с данным :id нет:
 метод возвращает 404
 Если ошибка валидации (напр. не указан email) или уникальности:
 метод возвращает 400 и объект с ошибками вида { errors: { field: error } }
 пример:
 {
 errors: {
 email: 'Такой email уже есть'
 }
 }
 Желательно, с тестами.
 */

const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const mongoose = require('./mongoose');
const bodyParser = require('koa-bodyparser');
const User = require('./user');


router.get('/users/:id', async (ctx) => {
  let id = mongoose.Types.ObjectId();
  console.log(id);
  try {
    let user = await User.findOne({_id: ctx.params.id});
    if(user === null) {
      ctx.throw(404)
    }
    ctx.body = user;
  } catch(err) {
    console.log(err);
  }
});

router.post('/users', async (ctx) => {
 console.log(ctx.request.body);
 let user =  await User.create({
    name: ctx.request.body.name,
    email: ctx.request.body.email
  });
  console.log(user);
  ctx.body = 'ok';
});

router.del('/users/:id', async (ctx) => {
  try {
    await User.remove({_id: ctx.params.id});
    ctx.body = 'deleted';
  } catch(err) {
    console.log(err);
  }
});
 
app.use(bodyParser());
app.use(router.routes());
app.listen(3000);