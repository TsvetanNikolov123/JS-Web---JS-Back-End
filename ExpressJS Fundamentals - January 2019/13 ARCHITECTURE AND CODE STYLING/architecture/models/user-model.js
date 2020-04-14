const {Schema, model} = require('mongoose');
const hashedPassword = require('../utils/hash-password');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 30,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 30,
    }
});

UserSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        hashedPassword(user.password)
            .then((hashedPassword) => {
                user.password = hashedPassword;
                next();
            })
            .catch((error) => {
                console.log(error);
                next();
            });
    } else {
        next();
    }
});

module.exports = model('User', UserSchema);