var express = require('express');
var router = express.Router();
var userService = require("../service/users")


router.post("/login", (req, res, next) => {
    userService.login(req.body.userId, req.body.password).then((userData) => {
        // console.log(req.cookies)
        res.cookie("userDataCookie", userData);
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


// router.get("/gid", (req, res, next) => {
//     //    userService.
//     userService.gId().then(response => {
//         res.send(response)
//     }).catch(err => next(err))
// })


module.exports = router
