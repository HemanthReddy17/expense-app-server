const User = require('../userModel');


const findByEmailId = async (emailId)=>{
    return await User.findOne({emailId}).exec();
}


module.exports={
    findByEmailId
}