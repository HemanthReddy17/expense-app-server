var dataModel = require("../utilities/connection")
var expenseBeenClassReturn = require("./beanClasses/expenseDataRetrun")

var expenseModel = {}



expenseModel.getExpenses = (userId) => {
    return dataModel.expenseCollection().then((expenseCollection => {
        return expenseCollection.find({ userId: userId }).then((expenseData) => {
            return expenseData.map(x => new expenseBeenClassReturn(x))
        })
    }))
}


expenseModel.generateExpenseId = () => {
    return dataModel.expenseCollection().then((collection) => {
        return collection.distinct("expenseId").then(ids => {
            let idArray = []
            ids.map(id => {
                idArray.push(id.slice(2))
            })
            let uId = Math.max(...idArray);
            return 'EX' + (uId + 1)
        })
    })
}




expenseModel.addExpenseData = (expenseData, totalAmount) => {
    return expenseModel.generateExpenseId().then(id => {
        expenseData.expenseId = id
        let newExpenseData = new expenseBeenClassReturn(expenseData)
        return dataModel.expenseCollection().then(collection => {
            return collection.create(newExpenseData).then(data => {
                return dataModel.getUserCollection().then(userCollection => {
                    return userCollection.updateOne(
                        { userId: data.userId },
                        {
                            $set: { totalAmount: totalAmount - data.amount },
                            $push: { expensess: data.expenseId }
                        }).then(updateData => {
                            if (updateData.nModified > 0) {
                                return data
                            } else {
                                let err = new Error("Booking failed");
                                err.status = 400;
                                throw err;
                            }
                        })
                })

            })
        })
    })
}







module.exports = expenseModel