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
        incomeService.addData(incomeData).then(data => {
            res.send(data)
        })
    }
})


router.put("/editIncome/:incomeId", (req, res, next) => {
    let incomeId = req.params.incomeId;
    let userData = req.cookies.userDataCookie;
    
    if (userData === undefined) {
        let err = new Error("Please Login...!!")
        err.status = 401
        next(err)
    } else {
        let userId = userData.userId
        incomeService.editIncome(incomeId, req.body,userId).then((data) => {
            res.json({ message: data })
        }).catch(err => { next(err) })
    }
})


router.delete("/deleteIncome/:incomeId", (req, res, next) => {
    let incomeId = req.params.incomeId;
    let userData = req.cookies.userDataCookie;
    if (userData === undefined) {
        let err = new Error("Please Login...!!")
        err.status = 401
        next(err)
    } else {
            incomeService.deleIncome(incomeId, userData.userId).then((data) => {
                res.json({ message: data })
            }).catch(err => next(err))
    }
})





// router.get("/gid",(req,res,next)=>{
//     incomeService.gif().then(data=>{res.send(data)})
// })



module.exports = router
