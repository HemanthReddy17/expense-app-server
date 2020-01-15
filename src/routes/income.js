var express = require('express');
var router = express.Router();

var incomeService = require("../service/income")

router.get("/showIncomes", (req, res, next) => {
    if (req.cookies.userDataCookie === undefined) {
        let err = new Error("Please Login...!!")
        err.status = 401
        next(err)
    } else {
        incomeService.getIncome(req.cookies.userDataCookie.userId).then((userIncomeData) => {
            res.send(userIncomeData)
        }).catch(err => next(err))
    }
})


router.post("/addIncomeData", (req, res, next) => {
    if (req.cookies.userDataCookie === undefined) {
        let err = new Error("Please Login...!!")
        err.status = 401
        next(err)
    } else {
        let incomeData = req.body
        incomeData.userId = req.cookies.userDataCookie.userId
        incomeService.addData(incomeData,req.cookies.userDataCookie.totalAmount).then(data => {
            res.send(data)
        })
    }
})

// router.get("/gid",(req,res,next)=>{
//     incomeService.gif().then(data=>{res.send(data)})
// })



module.exports = router
