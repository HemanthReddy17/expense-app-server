class UserExpenseData {
    constructor(obj) {
        this.userId = obj.userId;
        this.expenseId = obj.expenseId;
        this.category = obj.category;
        this.amount = obj.amount;
        this.date = obj.date;
        this.comments = obj.comments;
    }
}

module.exports = UserExpenseData