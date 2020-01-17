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


incomeModel.addIncomeData = (incomeData) => {
    return incomeModel.generateIncomeId().then(id => {
        incomeData.incomeId = id
        let newIncomeData = new incomeBeenClass(incomeData)
        return dataModel.incomeCollection().then(incomeCollection => {
            return incomeCollection.create(newIncomeData).then(incomeCreadtedData => {
                return dataModel.getUserCollection().then(userCollection => {
                    return userCollection.findOne({ userId: incomeCreadtedData.userId }).then(userData => {
                        return userCollection.updateOne(
                            { userId: incomeCreadtedData.userId },
                            {
                                $set: { totalAmount: userData.totalAmount + incomeCreadtedData.amount },
                                $push: { incomes: incomeCreadtedData.incomeId }
                            }
                        ).then(updateData => {
                            if (updateData.nModified > 0) {
                                return incomeCreadtedData
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
    })
}



incomeModel.editIncome = (incomeId, incomeData, userId) => {
    return dataModel.getUserCollection().then(userCollection => {
        return dataModel.incomeCollection().then((incomeCollection) => {
            return userCollection.findOne({ userId: userId }).then(userData => {
                if (userData.incomes.includes(incomeId)) {
                    return incomeCollection.findOne({ incomeId: incomeId }, { _id: 0 }).then((beforUpdateData) => {
                        if (beforUpdateData.amount != incomeData.amount || beforUpdateData.category != incomeData.category) {
                            return incomeCollection.updateOne(
                                { incomeId: incomeId },
                                {
                                    $set: { category: incomeData.category, amount: incomeData.amount, date: new Date() }
                                }).then((updateData) => {
                                    if (updateData.nModified > 0) {
                                        return userCollection.updateOne(
                                            { userId: userData.userId },
                                            { $set: { totalAmount: userData.totalAmount + incomeData.amount - beforUpdateData.amount } }
                                        ).then((userUpdated) => {
                                            if (userUpdated.nModified > 0) {
                                                return "Data Updated for Id:" + incomeId
                                            } else {
                                                let err = new Error("Update Failed")
                                                err.status = 404
                                                throw err
                                            }
                                        })
                                    }
                                })
                        } else {
                            let err = new Error("No changes to update")
                            err.status = 404
                            throw err
                        }
                    })

                } else {
                    let err = new Error("Can't edit")
                    err.status = 401
                    throw err
                }
            })
        })
    })
}




incomeModel.deleteIncome = (incomeId, userId) => {
    return dataModel.getUserCollection().then(userCollection => {
        return dataModel.incomeCollection().then((incomeCollection) => {
            return userCollection.findOne({ userId: userId }).then(userData => {
                if (userData.incomes.includes(incomeId)) {
                    return incomeCollection.findOne({ incomeId: incomeId }).then(incomeByIdData => {
                        return incomeCollection.deleteOne({ incomeId: incomeId }).then(deleteData => {
                            if (deleteData.deletedCount >= 1) {
                                return userCollection.updateOne(
                                    { userId: userData.userId },
                                    {
                                        $set: { totalAmount: userData.totalAmount - incomeByIdData.amount },
                                        $pull: { incomes: incomeId }
                                    },
                                    { multi: true }
                                ).then((data) => {
                                    return `Sucessfully deleted for Income Id: ${incomeId}`
                                })
                            }
                            else {
                                let err = new Error("ExpenseId Not exist")
                                err.status = 401
                                throw err
                            }
                        })
                    })
                } else {
                    let err = new Error("Doesn't Exist to delete")
                    err.status = 401
                    throw err
                }
            })
        })
    })
}

module.exports = incomeModel
