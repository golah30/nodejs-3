const db = require('./db.js');

module.exports.getLogin = (req, res, next) => {
  if (req.session.isAdmin) {
    return res.redirect('/admin');
  }
  res.render('pages/login', { title: 'Login page' });
};

module.exports.login = (req, res, next) => {
  if (req.body.email === void 0 && req.body.password === void 0) {
    return res.render('pages/login', {
      title: 'Login page',
      msglogin: 'Type something into fields'
    });
  }

  if (db.hasProperty('udb', 'admin')) {
    const { login, password } = db.getProperty('udb', 'admin');

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
