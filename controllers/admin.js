const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const db = require('./db.js');

module.exports.getAdmin = (req, res, next) => {
  const msg = req.flash('msgskill');
  const msg2 = req.flash('msgfile');
  let prop = {
    title: 'Admin page'
  };
  if (msg.lenght !== 0) {
    prop.msgskill = msg[0];
  }
  if (msg2.lenght !== 0) {
    prop.msgfile = msg2[0];
  }
  const skills = db.getSkillsFromdb();
  if (skills.length !== 0) {
    prop.skills = {};
    prop.skills.age = skills[0].number;
    prop.skills.concerts = skills[1].number;
    prop.skills.cities = skills[2].number;
    prop.skills.years = skills[3].number;
  }

  res.render('pages/admin', prop);
};

module.exports.setSkills = (req, res, next) => {
  const msgskill = db.setSkills(req.body);

  req.flash('msgskill', msgskill);
  res.redirect('/admin');
};

module.exports.setProduct = (req, res, next) => {
  let form = new formidable.IncomingForm();
  let upload = path.join('./public', 'upload');
  let fileName;

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err);
    }

    if (files.photo.name === '' || files.photo.size === 0) {
      req.flash('msgfile', 'Не загружена картинка!');
      return res.redirect('/admin');
    }

    if (!fields.name) {
      fs.unlink(files.photo.path);
      req.flash('msgfile', 'Не указано описание товара!');
      return res.redirect('/admin');
    }
    if (!fields.price) {
      fs.unlink(files.photo.path);
      req.flash('msgfile', 'Не указана цена товара!');
      return res.redirect('/admin');
    }

    fileName = path.join(upload, files.photo.name);

    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.error(err);
        fs.unlink(fileName);
        fs.rename(files.photo.path, fileName);
      }
      let dir = fileName.substr(fileName.indexOf('\\'));

      db.setProduct(fields.name, fields.price, dir);
      req.flash('msgfile', 'Товар успешно загружен');
      return res.redirect('/admin');
    });
  });
};
