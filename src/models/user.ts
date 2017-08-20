import { Document, Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

interface IUser extends Document{
    id: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: Number;
    mail?: string;
}

export const UserSchema: Schema = new Schema ({
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
UserSchema.pre('save', function(callback) {
  let user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Export the Mongoose model
export let User = model<IUser>('User', UserSchema);