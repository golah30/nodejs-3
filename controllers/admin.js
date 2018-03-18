const db = require('./db.js');
// const gAdapter = new FileSync('dbs/gdb.json');
// const goodsdb = low(gAdapter);

module.exports.getAdmin = (req, res, next) => {
  const msg = req.flash('msgskill');
  let prop = {
    title: 'Admin page'
  };
  if (msg.lenght !== 0) {
    prop.msgskill = msg[0];
  }

  res.render('pages/admin', prop);
};

module.exports.setSkills = (req, res, next) => {
  const msgskill = db.setSkills(req.body);

  req.flash('msgskill', msgskill);
  res.redirect('/admin');
};
