const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports = (req, res, next) => {
    const login = req.body.login;
    const password = req.body.password;

    const foundUser = db.get('users')
        .find({login: login, password: password})
        .value();

    if (foundUser) {
        res.json({ mes: "Aвторизация успешна!", status: "OK" });
    } else {
        res.json({ mes: "Логин и/или пароль введены неверно!", status: "Error" });
    }
  };