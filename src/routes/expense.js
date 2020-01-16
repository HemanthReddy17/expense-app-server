var express = require('express');
var router = express.Router();

var expenseService = require("../service/expense")


router.get("/showExpensess", (req, res, next) => {
    if (req.cookies.userDataCookie === undefined) {
        let err = new Error("Please Login...!!")
        err.status = 401
        next(err)
    } else {
        expenseService.getExpenses(req.cookies.userDataCookie.userId).then((userIncomeData) => {
            res.send(userIncomeData)
        }).catch(err => next(err))
    }
})


router.post("/addExpense", (req, res, next) => {
    if (req.cookies.userDataCookie === undefined) {
        let err = new Error("Please Login...!!")
        err.status = 401
        next(err)
    } else {
        let expenseData = req.body
        expenseData.userId = req.cookies.userDataCookie.userId
        let totalAmout = req.cookies.userDataCookie.totalAmount
        expenseService.addExpense(expenseData, totalAmout).then(data => {
            res.send(data)
        })
    }
})







module.exports = router
