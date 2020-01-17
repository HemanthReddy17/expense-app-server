const connection = require("../utilities/connection")

let userData = [
    { userId: "US1001", firstName: "Hemanth Reddy", lastName: "K", emailId: "khreddy11@gmail.com", contactNo: 8125457899, password: "hemanth", incomes: ["IN1001", "IN1002"], expensess: ["EX1001", "EX1002", "EX1003"], totalAmount: 15600 },
    { userId: "US1002", firstName: "Test User", lastName: "K", emailId: "test@gmail.com", contactNo: 9999999999, password: "hemanth", incomes: ["IN1003"], expensess: ["EX1004", "EX1005", "EX1006"], totalAmount: 20500 },
    { userId: "US1003", firstName: "Test User1", lastName: "test", emailId: "test1@gmail.com", contactNo: 83737373737, password: "hemanth" }
]

let incomeData = [
    { userId: "US1001", incomeId: "IN1001", date: "2019-12-09", category: "Salary", amount: 20000, comments: "Credited from Infosys Account" },
    { userId: "US1001", incomeId: "IN1002", date: "2020-01-15", category: "Friend", amount: 2000, comments: "Credited from Friend Account" },
    { userId: "US1002", incomeId: "IN1003", date: "2019-12-21", category: "Friend", amount: 22000, comments: "Credited from Infosys Account" }
]


let expenseData = [
    { userId: "US1001", expenseId: "EX1001", date: "2019-12-10", category: "Grocery", amount: 300, comments: "Purchased Onions" },
    { userId: "US1001", expenseId: "EX1002", date: "2019-12-15", category: "Grocery", amount: 100, comments: "Purchased Onions" },
    { userId: "US1001", expenseId: "EX1003", date: "2019-12-10", category: "Grocery", amount: 6000, comments: "Purchased Onions" },
    { userId: "US1002", expenseId: "EX1004", date: "2019-12-17", category: "Grocery", amount: 1000, comments: "Purchased Onions" },
    { userId: "US1002", expenseId: "EX1005", date: "2019-12-18", category: "Grocery", amount: 400, comments: "Purchased Onions" },
    { userId: "US1002", expenseId: "EX1006", date: "2019-12-29", category: "Grocery", amount: 100, comments: "Purchased Onions" }
]



exports.userSetup = () => {
    return connection.getUserCollection().then((userCollection) => {
        return userCollection.deleteMany().then(() => {
            return userCollection.insertMany(userData).then(() => {
                return connection.incomeCollection().then((incomeCollection) => {
                    return incomeCollection.deleteMany().then(() => {
                        return incomeCollection.insertMany(incomeData).then(() => {
                            return connection.expenseCollection().then((expenseCollection) => {
                                return expenseCollection.deleteMany().then(() => {
                                    return expenseCollection.insertMany(expenseData).then((dataAdded) => {
                                        if (dataAdded) {
                                            return "Insertion Successfull"
                                        } else {
                                            throw new Error("Insertion failed")
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

