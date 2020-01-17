var express = require('express');
var router = express.Router();
var userService = require("../service/users")


router.post("/login", (req, res, next) => {
    userService.login(req.body.userId, req.body.password).then((userData) => {
        res.cookie("userDataCookie", userData,{ httpOnly: true });
        res.json(userData)
    }).catch(err => next(err))
})


router.post("/register", (req, res, next) => {
    userService.register(req.body).then((response) => {
        res.status(201)
        res.json(response)
    }).catch(err => next(err))
})


router.get("/logout",(req,res,next)=>{
    res.clearCookie("userDataCookie")
    res.json({"meassage":"Sucessfully Logged Out"})
    // console.log("hhhhh"+JSON.stringify(req.cookies))

})



module.exports = router
