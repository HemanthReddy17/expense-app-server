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
        incomeService.addData(incomeData, req.cookies.userDataCookie.totalAmount).then(data => {
            res.send(data)
        })
    }
})


router.put("/editIncome/:incomeId", (req, res, next) => {
    let incomeId = req.params.incomeId;
    let userData = req.cookies.userDataCookie;
    if (req.cookies.userDataCookie === undefined) {
        let err = new Error("Please Login...!!")
        err.status = 401
        next(err)
    } else {
        if (req.cookies.userDataCookie.incomes.includes(incomeId)) {
            incomeService.editIncome(incomeId, req.body, userData).then((data) => {
                res.json({ message: data })
            }).catch(err => { next(err) })
        } else {
            let err = new Error("You Can't Edit this")
            err.status = 401
            next(err)
        }
    }
})


router.delete("/deleteIncome/:incomeId", (req, res, next) => {
    let incomeId = req.params.incomeId;
    let userData = req.cookies.userDataCookie;
    if (req.cookies.userDataCookie === undefined) {
        let err = new Error("Please Login...!!")
        err.status = 401
        next(err)
    } else {
        if (req.cookies.userDataCookie.incomes.includes(incomeId)) {
            incomeService.deleIncome(incomeId, userData).then((data) => {
                res.json({ message: data })
            }).catch(err => next(err))
        } else {
            let err = new Error("You Can't Edit this")
            err.status = 401
            next(err)
        }
    }
})





// router.get("/gid",(req,res,next)=>{
//     incomeService.gif().then(data=>{res.send(data)})
// })



module.exports = router
