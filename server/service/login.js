const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = async (ctx, next) => {
    const login = ctx.request.body.login;
    const password = ctx.request.body.password;

    const foundUser = db.get('users')
        .find({login: login, password: password})
        .value();

    if (foundUser) {
        ctx.body = { mes: 'Aвторизация успешна!', status: 'OK' };
    } else {
        ctx.body = { mes: 'Логин и/или пароль введены неверно!', status: 'Error' };
    }
};