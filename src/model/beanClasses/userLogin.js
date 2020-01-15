class UserLogin {
    constructor(obj) {
        this.userId = obj.userId;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.emailId = obj.emailId;
        this.contactNo = obj.contactNo;
        this.password = obj.password;
    }
}

module.exports = UserLogin;
