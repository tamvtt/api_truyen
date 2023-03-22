var express = require('express');
var router = express.Router();
const multer = require('multer');
let alert = require('alert');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const uri = "mongodb+srv://tamvt:CIg65aKTZxz4zsq4@cluster0.zkfrmhr.mongodb.net/?retryWrites=true&w=majority"
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connect to MongoDB");
  } catch (e) {
    console.error(e);
  }
}

connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

const USER = new mongoose.Schema({
  username: String,
  password: String
});

router.post('/register', function (req, res) {
  var username = req.body.Username;
  var password = req.body.Password;
  var repeatPassword = req.body.RepeatPassword;
  const user = mongoose.model('User', USER);
  const User = new user({
    username: username,
    password: password
  })
  if (username != '' && password != '' && repeatPassword == password) {
    User.save().then(data => {
      alert('Register thành công');
    })
  } else {
    alert('Chưa nhập Username hoặc Password');
  }
});

router.post('/login', async function (req, res) {
  var username = req.body.Username;
  var password = req.body.Password;

  const user = mongoose.model('User', USER);
  let check = await user.findOne({
    username: username,
    password: password
  });
  if (check != null) {
    alert('Login thành công');
    res.render('index', { title: 'Express' });
  } else if (username == '' || password == '') {
    alert('Chưa nhập Username hoặc Password');
  } else {
    alert('Usename hoặc Password sai');
  }
  // if (username == 'admin' && password == 123456) {
  //   alert('Login thành công');
  // } else if (username == '' || password == '') {
  //   alert('Chưa nhập Username hoặc Password');
  // } else {
  //   alert('Usename hoặc Password sai');
  // }
});

router.get('/list', function (req, res, next) {
  const user = mongoose.model('User', USER);
  user.find({}).then(data => {
    res.json(data);
  })
})

module.exports = router;
