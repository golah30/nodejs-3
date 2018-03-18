const nodemailer = require('nodemailer');
const config = require('../config.json');
const db = require('./db.js');

module.exports.getIndex = (req, res, next) => {
  const msg = req.flash('msgemail');
  let prop = {
    title: 'Home page'
  };
  if (msg.lenght !== 0) {
    prop.msgemail = msg[0];
  }
  prop.skills = db.getSkillsFromdb();
  res.render('pages/index', prop);
};

module.exports.sendEmail = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    req.flash('msgemail', 'Необходимо заполнить все поля');
    return res.redirect('/#mail');
  }

  let transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: config.mail.from,
    to: config.mail.to,
    subject: config.mail.subject,
    text: `Пользователь ${req.body.name} написал: \n ${
      req.body.message
    }\n Отправил с: <${req.body.email}>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      req.flash('msgemail', 'При отправке письма произошла ошибка');
      return res.redirect('/#mail');
    }
    req.flash('msgemail', 'Сообщение отправлено');
    res.redirect('/#mail');
  });
};
