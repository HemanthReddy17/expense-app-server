const express = require('express');

const transactionController = require('../controllers/transactionController')

const router = express.Router();

router.route('/getUserTransactions/:userId').get(transactionController.getUserTransactions);
router.route('/addTransaction').post(transactionController.addTransaction);

module.exports = router