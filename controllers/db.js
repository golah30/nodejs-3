const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const sAdapter = new FileSync('dbs/sdb.json');
const skillsdb = low(sAdapter);

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
