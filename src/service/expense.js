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

expenseService.addExpense = (expenseData, totalAmount) => {
    return expenseModel.addExpenseData(expenseData, totalAmount).then(data => {
        return data
    })

}

module.exports = expenseService