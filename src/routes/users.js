const express = require('express');
const userAuthCont = require('../controllers/auth.user.controller');


const router = express.Router();



router.route('/signup').post(userAuthCont.signup);
router.route('/login').post(userAuthCont.login);
router.route('/logout').get(userAuthCont.logout)


module.exports = router
