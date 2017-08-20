import { Document, Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

interface IClient extends Document {
    name: string;
    id: string;
    sectet: string;
    userId: string;
}

const ClientSchema: Schema = new Schema ({
    name: {
        type: String,
        unique: true,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

// Execute before each user.save() call
ClientSchema.pre('save', function(callback) {
  let client = this;

  // Break out if the secret hasn't changed
  if (!client.isModified('secret')) return callback();

  // Secret changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(client.secret, salt, null, function(err, hash) {
      if (err) return callback(err);
      client.secret = hash;
      callback();
    });
  });
});

ClientSchema.methods.verifySecret = function(secret, cb) {
    bcrypt.compare(secret, this.secret, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export let Client = model<IClient>('Cleint', ClientSchema);