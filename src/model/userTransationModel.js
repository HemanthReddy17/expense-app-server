const { model, Schema } = require("mongoose");
const tarnsacionModel = require('./transactionModel');

const userTransationSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'There Should be a User Id;']
    },
    transactions: {
        type: [String],
        default:[]
    },

    totalAmount:{
        type:Number,
        default:0
    }
})

const userTransation = model('UserTransaction', userTransationSchema);
module.exports = userTransation;