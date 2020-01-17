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




expenseModel.addExpenseData = (expenseData) => {
    return expenseModel.generateExpenseId().then(id => {
        expenseData.expenseId = id
        let newExpenseData = new expenseBeenClassReturn(expenseData)
        return dataModel.expenseCollection().then(expenseCollection => {
            return expenseCollection.create(newExpenseData).then(expenseCreatedData => {
                return dataModel.getUserCollection().then(userCollection => {
                    return userCollection.findOne({ userId: expenseCreatedData.userId }).then(userData => {
                        return userCollection.updateOne(
                            { userId: userData.userId },
                            {
                                $set: { totalAmount: userData.totalAmount - expenseCreatedData.amount },
                                $push: { expensess: expenseCreatedData.expenseId }
                            }
                        ).then(updateData => {
                            if (updateData.nModified > 0) {
                                return expenseCreatedData
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

expenseModel.editExpense = (expenseId, expenseData, userId) => {
    return dataModel.getUserCollection().then(userCollection => {
        return dataModel.expenseCollection().then(expenseCollection => {
            return userCollection.findOne({ userId: userId }).then(userData => {
                if (userData.expensess.includes(expenseId)) {
                    return expenseCollection.findOne({ expenseId: expenseId }).then(beforeUpdateExpenseData => {
                        if (beforeUpdateExpenseData.amount != expenseData.amount || beforeUpdateExpenseData.category != expenseData.category) {
                            return expenseCollection.updateOne(
                                { expenseId: expenseId },
                                {
                                    $set: { category: expenseData.category, amount: expenseData.amount, date: new Date() }
                                }
                            ).then(updateData => {
                                if (updateData.nModified > 0) {
                                    return userCollection.updateOne(
                                        { userId: userId },
                                        {
                                            $set: { totalAmount: userData.totalAmount + beforeUpdateExpenseData.amount - expenseData.amount }
                                        }
                                    ).then((userUpdated) => {
                                        return "Data Updated for Id:" + expenseId
                                    })
                                }
                                else {
                                    let err = new Error("Update Failed")
                                    err.status = 404
                                    throw err
                                }
                            })
                        }
                        else {
                            let err = new Error("No change to update")
                            err.status = 404
                            throw err
                        }
                    })
                }
                else {
                    let err = new Error("Can't edit")
                    err.status = 401
                    throw err
                }

            })

        })
    })
}

expenseModel.deleteExpense =(expenseId,userId)=>{
    return dataModel.getUserCollection().then(userCollection => {
        return dataModel.expenseCollection().then(expenseCollection => {
            return userCollection.findOne({ userId: userId }).then(userData => {
                if (userData.expensess.includes(expenseId)) {
                    return expenseCollection.findOne({ expenseId: expenseId }).then(beforeUpdateExpenseData => {
                        return expenseCollection.deleteOne({expenseId:expenseId}).then(deleteData => {
                            if (deleteData.deletedCount >= 1) {
                                return userCollection.updateOne(
                                    { userId: userData.userId },
                                    {
                                        $set: { totalAmount: userData.totalAmount + beforeUpdateExpenseData.amount },
                                        $pull: { expensess: expenseId }
                                    },
                                    { multi: true }
                                ).then((data) => {
                                    return `Sucessfully deleted for Expense Id: ${expenseId}`
                                })
                            }
                            else {
                                let err = new Error("ExpenseId Not exist")
                                err.status = 401
                                throw err
                            }
                        })
                    })

                }
                else {
                    let err = new Error("Can't Delelet")
                    err.status = 401
                    throw err
                }

            })

        })


    })

}





module.exports = expenseModel