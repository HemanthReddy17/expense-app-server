var dataModel = require("../utilities/connection")
var userBeenModelReturn = require("./beanClasses/userRetrunData")
var userBeenModelRegister = require("./beanClasses/userLogin")

var usersDB = {}


usersDB.checkUser = (userId) => {
    let emailIdPattren = /^([A-z0-9]+)@([A-z]+)([.]com)$/
    if (emailIdPattren.test(userId)) {
        return dataModel.getUserCollection().then((collection) => {
            return collection.findOne({ emailId: userId }).then((userData) => {
                if (userData) {
                    return true
                } else {
                    return false
                }
            })
        })
    } else {
        return dataModel.getUserCollection().then((collection) => {
            return collection.findOne({ contactNo: userId }).then((userData) => {
                if (userData) {
                    return true
                } else {
                    return false
                }
            })
        })
    }

}


usersDB.getPassword = (userId, password) => {
    let emailIdPattren = /^([A-z0-9]+)@([A-z]+)([.]com)$/
    if (emailIdPattren.test(userId)) {
        return dataModel.getUserCollection().then((collection) => {
            return collection.findOne({ emailId: userId, password: password }, { _id: 0 }).then((userData) => {
                if (userData) {
                    return new userBeenModelReturn(userData)
                } else {
                    return false
                }
            })
        })
    } else {
        return dataModel.getUserCollection().then((collection) => {
            return collection.findOne({ contactNo: userId, password: password }, { _id: 0 }).then((userData) => {
                if (userData) {
                    return new userBeenModelReturn(userData)
                } else {
                    return false
                }
            })
        })
    }
}


//GenerateUserId
usersDB.generateUserId = () => {
    return dataModel.getUserCollection().then(model => {
        return model.distinct("userId").then(ids => {
            let idArray = []
            ids.map(id => {
                idArray.push(id.slice(2))
            })
            let uId = Math.max(...idArray);
            return 'US' + (uId + 1)
        })
    })
}


usersDB.registerUser = (data) => {
    return dataModel.getUserCollection().then((registerUser) => {
        return usersDB.checkUser(data.emailId).then((userData) => {
            if (userData) {
                let err = new Error("Already Registered")
                err.status = 500
                throw err
            } else {
                return usersDB.generateUserId().then(id => {
                    data.userId = id
                    let userBeenData = new userBeenModelRegister(data)
                    return registerUser.create(userBeenData).then((insertData) => {
                        if (insertData) {
                            return ("You are registered succesfully with the user ID : " + userBeenData.userId);
                        } else {
                            let err = new Error("Registration unsuccessfull");
                            err.status = 500;
                            throw err;
                        }
                    })
                })
            }
        })
    })
}





module.exports = usersDB;