const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  let emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if(!name || !email || !message || !emailRegexp.test(email.toLowerCase())) {
    res.json({ mes: "Неправильный Email", status: "Error" });
    return;
  } else {
    db.get('contact_requests')
    .push({ name: name, email: email, message: message })
    .write();
    
    res.json({ mes: "Сообщение отправлено!", status: "OK" });
  }
};