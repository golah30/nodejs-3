const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('dbs/udb.json');
const udb = low(adapter);

module.exports.getLogin = (req, res, next) => {
  res.render('pages/login', { title: 'Login page' });
};
module.exports.login = (req, res, next) => {
  if (udb.has('admin').value()) {
    const { login, password } = udb.get('admin').value();
    console.log(login, password);

    if (req.body.email === login && req.body.password === password) {
      req.session.isAdmin = true;
    } else {
      return res.render('pages/login', {
        title: 'Login page',
        msglogin: 'Email or password is wrong'
      });
    }
  } else {
    console.error('Database error: property admin is not defined');
    return res.render('pages/login', {
      title: 'Login page',
      msglogin: 'Database error'
    });
  }

  res.redirect('/admin');
};
