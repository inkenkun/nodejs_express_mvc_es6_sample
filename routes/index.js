const express = require('express');
const router = express.Router();

import User_Controller from '../controllers/user';
import Auth_Controller from '../controllers/auth';
const user_ctr = new User_Controller();
const auth_ctr = new Auth_Controller();

const sessionCheck = function(req, res, next) {
  if (req.session.uid) {
    next();
  } else {
    console.log('no session');
    next();
  }
};

router.get('/user/:id?', sessionCheck, user_ctr.getUser);
router.post('/user/', sessionCheck, user_ctr.addUser);

router.post('/login/', auth_ctr.login);
router.get('/logout/', auth_ctr.logout);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeJs Express4 MVC Sample' });
});

module.exports = router;
