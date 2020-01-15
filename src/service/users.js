var userModel = require("../model/users")
var validator = require("./validators/userValidator")
var userService = {}


userService.login = (userId, password) => {
    // console.log(userId)
    return userModel.checkUser(userId).then((userBool) => {
        if (!userBool) {
            let err = new Error("You Haven't Registered Yet! Please Register..!!")
            err.status = 404
            throw err
        } else if (userBool) {
            return userModel.getPassword(userId, password).then(userData => {
                if (userData) {
                    return userData
                } else {
                    let err = new Error("Wrong Password")
                    err.status = 404
                    throw err
                }
            })
        }
    })
}


// userService.gId = ()=>{
//     return userModel.generateUserId().then(id=>{
//         return id
//     })
// }

userService.register = (userData) => {
    validator.userEmailValidate(userData.emailId)
    validator.userPhoneValidate(userData.contactNo)
    validator.userPasswordValidate(userData.password)
    return userModel.registerUser(userData).then((response) => {
        return response
    })
}





module.exports = userService