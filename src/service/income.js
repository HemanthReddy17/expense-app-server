var incomeModel = require("../model/income")

var incomeService = {}

incomeService.getIncome = (userId) => {
    return incomeModel.getIncomes(userId).then((userIncomeData) => {
        if (userIncomeData.length > 0) {
            return userIncomeData
        }
        else {
            let err = new Error("No Incomes avilable")
            err.status = 404
            throw err
        }
    })
}

// dddd

incomeService.addData = (incomeData,totalAmount) => {
    return incomeModel.addIncomeData(incomeData,totalAmount).then(data => {
        return data
    })
}

// incomeService.gif=()=>{
//     return incomeModel.generateIncomeId().then(data=>{return data})
// }

module.exports = incomeService