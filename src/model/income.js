var dataModel = require("../utilities/connection")
var incomeBeenClass = require("../model/beanClasses/userIncomeData")

var incomeModel = {}

incomeModel.getIncomes = (userId) => {
    return dataModel.incomeCollection().then(collection => {
        return collection.find({ userId: userId }, { _id: 0 }).then(data => {
            return data.map(x => new incomeBeenClass(x))
        })
    })
}


incomeModel.generateIncomeId = () => {
    return dataModel.incomeCollection().then((collection) => {
        return collection.distinct("incomeId").then(ids => {
            let idArray = []
            ids.map(id => {
                idArray.push(id.slice(2))
            })
            let uId = Math.max(...idArray);
            return 'IN' + (uId + 1)
        })
    })
}


incomeModel.addIncomeData = (incomeData, totalAmount) => {
    return incomeModel.generateIncomeId().then(id => {
        incomeData.incomeId = id
        let newIncomeData = new incomeBeenClass(incomeData)
        return dataModel.incomeCollection().then(collection => {
            return collection.create(newIncomeData).then(data => {
                // console.log(totalAmount)
                return dataModel.getUserCollection().then(userCollection => {
                    return userCollection.updateOne(
                        { userId: data.userId },
                        {
                            $set: { totalAmount: totalAmount + data.amount },
                            $push: { incomes: data.incomeId }
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

module.exports = incomeModel