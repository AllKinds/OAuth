import * as passport        from 'passport';
import { BasicStrategy }    from 'passport-http';
import * as  Bearer from 'passport-http-bearer';
var BearerStrategy = Bearer.Strategy;


import { User }     from '../models/user';
import { Client }   from '../models/client';
import { Token }    from '../models/token';


passport.use(new BasicStrategy(
    (username, password, callback) => {
        User.findOne({ id: username }, (err, user) => {
            if(err) return callback(err);

            // No user found with that username
            if(!user) return callback(null, false);

            // Make sure the password is correct
            user.verifyPassword(password, (err, isMatch) => {
                if(err) return callback(err);

                // Password did not match
                if(!isMatch) return callback(null, false);

                // Success
                return callback(null, user);
            });
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    (id, secret, callback) => {
        Client.findOne( { id: id }, (err, client) => {
            if(err) return callback(err);

            // No client found with that id
            if(!client) return callback(null, false);

            // Make sure the secret is correct
            client.verifySecret(secret, (err, isMatch) => {
                if(err) return callback(err);

                // Password did not match
                if(!isMatch) return callback(null, false);

                // Success
                console.log('Client is Authenticated ')
                return callback(null, client);
            });
        });
    }
));


passport.use(new BearerStrategy(
    (accessToken, callback) => {
        Token.findOne({value: accessToken}, (err, token) => {
            if(err) return callback(err);

            // No token found
            if(!token) return callback(null, false);

            User.findOne({ _id: token.userId }, (err, user) => {
                if (err) { return callback(err); }

                // No user found
                if (!user) { return callback(null, false); }

                // Simple example with no scope
                callback(null, user, { scope: '*' });
            });
        });
    }
));

export class AuthController {

    isAuthenticated: any;
    isClientAuthenticated: any;
    isBearerAuthenticated: any;

    constructor() {
        this.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session: false });
        this.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
        this.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
    }

}

