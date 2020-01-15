let validator = {}

validator.userEmailValidate = (emailId) => {
    let pattern = /^([A-z0-9]+)@([A-z]+)([.]com)$/
    if (!pattern.test(emailId)) {
        let err = new Error("Invalid email! The emailid should be of the following format: example@exm.com");
        err.status = 406
        throw err;
    }
}

validator.userPhoneValidate = (phNumber) => {
    let pattern = /^[0-9]{10}$/
    if (!pattern.test(phNumber)) {
        let err = new Error("Invalid Phone Number!");
        err.status = 406
        throw err;
    }
}

validator.userPasswordValidate=(password)=>{
    let pattern = /^((?=.*\d)(?=.*[A-Z]).{8})$/
    if (!pattern.test(password)) {
        let err = new Error("Invalid Password! It should contain 1 Number and 1 caps lock. Should have 8 chars");
        err.status = 406
        throw err;
    }
}

module.exports = validator