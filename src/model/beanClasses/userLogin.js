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

// {userId: "US1003", firstName: "Test User1", lastName: "test", emailId: "test1@gmail.com", contactNo: 83737373737, password: "hemanth" }
