"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
exports.UserSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    phone: Number,
    mail: String
});
// Execute before each user.save() call
exports.UserSchema.pre('save', function (callback) {
    var user = this;
    // Break out if the password hasn't changed
    if (!user.isModified('password'))
        return callback();
    // Password changed so we need to hash it
    bcrypt.genSalt(5, function (err, salt) {
        if (err)
            return callback(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err)
                return callback(err);
            user.password = hash;
            callback();
        });
    });
});
exports.UserSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};
// Export the Mongoose model
exports.User = mongoose_1.model('User', exports.UserSchema);

//# sourceMappingURL=../../build/models/user.js.map
