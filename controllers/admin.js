const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const sAdapter = new FileSync('dbs/sdb.json');
const skillsdb = low(sAdapter);

// const gAdapter = new FileSync('dbs/gdb.json');
// const goodsdb = low(gAdapter);

function updateSkill (field) {
  skillsdb
    .get('skills')
    .assign(field)
    .write();
}

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
  let msgskill;
  if (skillsdb.has('skills').value()) {
    if (req.body.age) {
      updateSkill({ age: req.body.age });
    }
    if (req.body.concerts) {
      updateSkill({ concerts: req.body.concerts });
    }
    if (req.body.cities) {
      updateSkill({ cities: req.body.cities });
    }
    if (req.body.years) {
      updateSkill({ years: req.body.years });
    }
    msgskill = 'Updated';
  } else {
    console.error('Database error: property admin is not defined');
    msgskill = 'Database error';
  }
  req.flash('msgskill', msgskill);
  res.redirect('/admin');
};
