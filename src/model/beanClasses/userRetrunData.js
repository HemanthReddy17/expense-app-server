class User {
    constructor(obj) {
        this.userId = obj.userId;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.emailId = obj.emailI;
        this.contactNo = obj.contactNo;
        this.password = obj.password;
        this.incomes = obj.incomes;
        this.expensess = obj.expensess
        this.totalAmount = obj.totalAmount
    }
}

module.exports = User;
