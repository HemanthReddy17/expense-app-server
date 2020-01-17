var expenseModel = require("../model/expense")

var expenseService = {}


expenseService.getExpenses = (userId) => {
    return expenseModel.getExpenses(userId).then((userIncomeData) => {
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

expenseService.addExpense = (expenseData) => {
    return expenseModel.addExpenseData(expenseData).then(data => {
        return data
    })
}

expenseService.editExpense = (expenseId, expenseData, userId) => {
    return expenseModel.editExpense(expenseId, expenseData, userId).then(data => {
        return data
    })
}


expenseService.deleteExpense=(expenseId,userId)=>{
    return expenseModel.deleteExpense(expenseId,userId).then(data=>{
        return data
    })
}

module.exports = expenseService