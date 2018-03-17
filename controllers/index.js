const nodemailer = require('nodemailer');
const config = require('../config.json');

module.exports.getIndex = (req, res, next) => {
  if (req.query.mail) {
    const msg =
      req.query.mail === '1'
        ? 'Необходимо заполнить все поля'
        : req.query.mail === '2'
          ? 'При отправке письма произошла ошибка'
          : 'Сообщение отправлено';
    res.render('pages/index', {
      title: 'Home page',
      msgemail: msg
    });
  } else {
    res.render('pages/index', { title: 'Home page' });
  }
};

module.exports.sendEmail = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.status(403).redirect('/?mail=1#mail');
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
      return res.status(500).redirect('/?mail=2#mail');
    }
    res.redirect('/?mail=3#mail');
  });
};
