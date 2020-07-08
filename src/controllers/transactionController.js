const { findByEmailId } = require('../model/repo/userRepo');
const Transation = require('../model/transactionModel');
const UserTransation = require('../model/userTransationModel');

const getUserTransactions = (req, res, next) => {

}


const addTransaction = (req, res, next) => {
    const transactionData = new Transation(req.body);
    console.log(transactionData)
    res.json({ message: 'Hi' });
}

module.exports = {
    getUserTransactions,
    addTransaction
}