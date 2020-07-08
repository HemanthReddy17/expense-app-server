const { model, Schema } = require("mongoose");
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    firstName: {
        type: String,
        require: [true, "Please tell us your Name"]
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Please provide your email"],
        match: [/^([A-z0-9]+)@([A-z]+)([.]com)$/, `Invalid E-MailId`]
    },
    contactNo: {
        type: Number,
        unique: true,
        required: [true, "Please provide your Contact Number"],
        match: [/^[0-9]{10}$/, `Invalid Phone Number`]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"]
    }
})



userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    console.log(this.isModified('password'));
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};




const User = model('User', userSchema);

module.exports = User;