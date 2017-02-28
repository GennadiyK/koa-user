/*
 REST-сервис для юзеров на Koa.JS + Mongoose
  - User имеет уникальный email, а также даты создания и модификации и имя displayName.
      
      





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

//1. GET /users/:id - получить юзера по id, например: /users/57ffe7300b863737ddfe9a39 - DONE
router.get('/users/:id', async (ctx) => {
  let id = mongoose.Types.ObjectId();
  console.log(id);
  try {
    let user = await User.findOne({_id: ctx.params.id});
    
    // Если юзера с данным :id нет:       метод возвращает 404
    if(user === null) {
      ctx.throw(404)
    }
    ctx.body = user;
  } catch(err) {
    console.log(err);
  }
});

//2. GET /users - получить массив юзеров
router.get('/users', async (ctx) => {
  try {
    let users = await User.find({});
    ctx.body = users;
  } catch (err) {
    console.log(err);
  }
   
});

// 3. POST /users - создать пользователя.  Метод POST позволяет указать только email и displayName (нельзя при создании юзера указать его _id)
router.post('/users', async (ctx) => {
  try {
    let user =  await User.create({
      displayName: ctx.request.body.displayName,
      email: ctx.request.body.email
    });
    console.log(user);
    ctx.body = 'ok';
  } catch (err) {
    console.log(err);
  }
  

});

// 4. PATCH /users/:id - модифицировать пользователя.  Метод PATCH позволяет поменять только email и displayName (нельзя при создании юзера указать его _id)

router.patch('/users/:id', async (ctx) => {
  try {
    let user = await User.findOneAndUpdate({_id: ctx.params.id}, {email: ctx.request.body.email, displayName: ctx.request.body.displayName});
    if(user === null) {
      ctx.throw(404);
    }
    ctx.body = 'ok';
  } catch (err) {
    console.log(err);
  }
});


//5. DELETE /users/:id - удалить пользователя
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