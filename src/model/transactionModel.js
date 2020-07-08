const { model, Schema } = require("mongoose");

const transactionSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'There Should be a User Id;']
    },
    transactionType: {
        type: String,
        enum: ['income', 'expense'],
        required: [true, 'It should be either Incomoe or Expense'],
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        require: [true, "Required field"],
        default: "Others"
    },
    amount: {
        type: Number,
        require: [true, "Required field"],
        default: 0
    },
    comments: {
        type: String,
        default: null
    }
})

const transation = model('Transaction', transactionSchema);
module.exports = transation;
