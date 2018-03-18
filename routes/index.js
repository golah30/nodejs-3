const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/index');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');

const isAdmin = (req, res, next) => {
  // если в сессии текущего пользователя есть пометка о том, что он является
  // администратором
  if (req.session.isAdmin) {
    // то всё хорошо :)
    return next();
  }
  // если нет, то перебросить пользователя на главную страницу сайта
  res.redirect('/');
};

router.get('/', ctrlHome.getIndex);
router.post('/', ctrlHome.sendEmail);

router.get('/admin', isAdmin, ctrlAdmin.getAdmin);
router.post('/admin/skills', isAdmin, ctrlAdmin.setSkills);

router.post('/login', ctrlLogin.login);
router.get('/login', ctrlLogin.getLogin);

module.exports = router;
