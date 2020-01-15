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
        }).catch(err=>next(err))

    }

})




module.exports = router
