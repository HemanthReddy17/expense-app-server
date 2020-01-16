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



incomeService.addData = (incomeData, totalAmount) => {
    return incomeModel.addIncomeData(incomeData, totalAmount).then(data => {
        return data
    })
}


incomeService.editIncome = (incomeId,incomeData,userData) => {
    return incomeModel.editIncome(incomeId, incomeData,userData).then(data => {
        return data
    })
}


incomeService.deleIncome = (incomeId,userData)=>{
    return incomeModel.deleteIncome(incomeId,userData).then(data=>{
        return data
    })
}




// incomeService.gif=()=>{
//     return incomeModel.generateIncomeId().then(data=>{return data})
// }

module.exports = incomeService