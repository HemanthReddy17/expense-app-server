const { Schema } = require("mongoose");
var Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
var url = 'mongodb://localhost:27017/ExpenseApp_DB';

//userSchema
var userSchema = Schema({
    userId: { type: String, unique: true },
    firstName: { type: String, require: [true, "Required field"] },
    lastName: { type: String, require: [true, "Required field"] },
    emailId: { type: String, required: [true, "Required field"] },
    contactNo: { type: Number, required: [true, "Required field"] },
    password: { type: String, required: [true, "Required field"] },
    incomes: { type: [String] },
    expensess: { type: [String] },
    totalamount: { type: Number }
})


//IncomeSchema
var incomeSchema = Schema({
    incomeId: { type: String, unique: true },
    date: { type: Date, default: Date.now },
    category: { type: String, require: [true, "Required field"], default: "Others" },
    amount: { type: Number, require: [true, "Required field"], default: 0 },
    comments: { type: String }
})

//ExpenseSchema
var expenseSchema = Schema({
    expenseId: { type: String, unique: true },
    date: { type: Date, default: Date.now },
    category: { type: String, require: [true, "Required field"], default: "Others" },
    amount: { type: Number, require: [true, "Required field"], default: 0 },
    comments: { type: String }
})


var collection = {}

collection.getUserCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model("Users", userSchema)
    }).catch(() => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.incomeCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model("Incomes", incomeSchema)
    }).catch(() => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}


collection.expenseCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model("Expense", expenseSchema)
    }).catch(() => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = collection