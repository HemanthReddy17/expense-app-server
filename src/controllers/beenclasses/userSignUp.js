class UserSignup {
    constructor(obj) {
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.emailId = obj.emailId;
        this.contactNo = obj.contactNo;
        this.password = obj.password;
    }
}

module.exports = UserSignup;