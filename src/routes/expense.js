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
        expenseService.addExpense(expenseData).then(data => {
            res.send(data)
        })
    }
})



router.put("/editExpense/:expenseId", (req, res, next) => {
    let expenseId = req.params.expenseId
    let userData = req.cookies.userDataCookie;
    if (req.cookies.userDataCookie === undefined) {
        let err = new Error("Please Login...!!")
        err.status = 401
        next(err)
    } else {
        expenseService.editExpense(expenseId, req.body, userData.userId).then((data) => {
            res.json({ message: data })
        }).catch(err => { next(err) })
    }
})


router.delete("/deleteExpense/:expenseId", (req, res, next) => {
    let expenseId = req.params.expenseId;
    let userData = req.cookies.userDataCookie;
    if (userData === undefined) {
        let err = new Error("Please Login...!!")
        err.status = 401
        next(err)
    } else {
        expenseService.deleteExpense(expenseId,userData.userId).then(data => {
            res.json({ message: data })
        }).catch(err => next(err))
    }

})




module.exports = router
