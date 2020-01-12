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
    date:{type:Date,default: Date.now},
    category:{type: String,require: [true, "Required field"],default:"Others"},
    amount:{type:Number,require: [true, "Required field"],default:0},
    comments:{type:String}
})

//ExpenseSchema
var expenseSchema = Schema({
    expenseId: { type: String, unique: true },
    date:{type:Date,default: Date.now},
    category:{type: String,require: [true, "Required field"],default:"Others"},
    amount:{type:Number,require: [true, "Required field"],default:0},
    comments:{type:String}
})



