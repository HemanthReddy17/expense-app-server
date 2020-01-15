class UserIncomeData {
    constructor(obj) {
        this.userId = obj.userId;
        this.incomeId = obj.incomeId;
        this.category = obj.category;
        this.amount = obj.amount;
        this.date = obj.date;
        this.comments = obj.comments;
    }
}

module.exports = UserIncomeData