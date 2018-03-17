module.exports.getAdmin = (req, res, next) => {
  res.render('pages/admin', { title: 'Admin page' });
};
