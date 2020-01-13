var express = require('express');
var router = express.Router();

var setupUser = require("../model/setupDB")

//userSet UP
router.get("/setupDB", (req, res, next) => {
    setupUser.userSetup().then((userData) => {
        res.json(userData)
    }).catch(err => next(err))
})


module.exports = router
