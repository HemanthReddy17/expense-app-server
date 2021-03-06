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



incomeService.addData = (incomeData) => {
    return incomeModel.addIncomeData(incomeData).then(data => {
        return data
    })
}


incomeService.editIncome = (incomeId, incomeData, userId) => {
    return incomeModel.editIncome(incomeId, incomeData, userId).then(data => {
        return data
    })
}


incomeService.deleIncome = (incomeId, userId) => {
    return incomeModel.deleteIncome(incomeId, userId).then(data => {
        return data
    })
}




// incomeService.gif=()=>{
//     return incomeModel.generateIncomeId().then(data=>{return data})
// }

module.exports = incomeService