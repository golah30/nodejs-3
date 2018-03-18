const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const sAdapter = new FileSync('dbs/sdb.json');
const skillsdb = low(sAdapter);

const adapter = new FileSync('dbs/udb.json');
const udb = low(adapter);

const gAdapter = new FileSync('dbs/gdb.json');
const goodsdb = low(gAdapter);

function updateSkill (field) {
  skillsdb
    .get('skills')
    .assign(field)
    .write();
}
module.exports.setSkills = body => {
  if (skillsdb.has('skills').value()) {
    if (body.age) {
      updateSkill({ age: body.age });
    }
    if (body.concerts) {
      updateSkill({ concerts: body.concerts });
    }
    if (body.cities) {
      updateSkill({ cities: body.cities });
    }
    if (body.years) {
      updateSkill({ years: body.years });
    }
    return 'Updated';
  } else {
    console.error('Database error: property skills is not defined');
    return 'Database error';
  }
};
module.exports.hasProperty = (db, name) => {
  if (db === 'udb') {
    return udb.has(name).value();
  } else {
    return false;
  }
};
module.exports.getProperty = (db, name) => {
  if (db === 'udb') {
    return udb.get(name).value();
  } else {
    return false;
  }
};
module.exports.getSkillsFromdb = () => {
  let skills = [
    {
      number: 0,
      text: 'Возраст начала занятий на скрипке'
    },
    {
      number: 0,
      text: 'Концертов отыграл'
    },
    {
      number: 0,
      text: 'Максимальное число городов в туре'
    },
    {
      number: 0,
      text: 'Лет на сцене в качестве скрипача'
    }
  ];
  const { age, concerts, cities, years } = skillsdb.get('skills').value();
  skills[0].number = age;
  skills[1].number = concerts;
  skills[2].number = cities;
  skills[3].number = years;
  return skills;
};

module.exports.setProduct = (name, price, dir) => {
  goodsdb
    .get('products')
    .push({ src: dir, name: name, price: price })
    .write();
};

module.exports.getProductsFromdb = () => {
  return goodsdb.get('products').value();
};
