const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports =  async (ctx, next) => {
  const name = ctx.request.body.name;
  const email = ctx.request.body.email;
  const message = ctx.request.body.message;

  let emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if(!name || !email || !message || !emailRegexp.test(email.toLowerCase())) {
    ctx.body = { mes: 'Неправильный Email', status: 'Error' };
    return;
  } else {
    db.get('contact_requests')
    .push({ name: name, email: email, message: message })
    .write();
    
    ctx.body = { mes: 'Сообщение отправлено!', status: 'OK' };
  }
};