"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passport_http_1 = require("passport-http");
var Bearer = require("passport-http-bearer");
var BearerStrategy = Bearer.Strategy;
var user_1 = require("../models/user");
var client_1 = require("../models/client");
var token_1 = require("../models/token");
passport.use(new passport_http_1.BasicStrategy(function (username, password, callback) {
    user_1.User.findOne({ id: username }, function (err, user) {
        if (err)
            return callback(err);
        // No user found with that username
        if (!user)
            return callback(null, false);
        // Make sure the password is correct
        user.verifyPassword(password, function (err, isMatch) {
            if (err)
                return callback(err);
            // Password did not match
            if (!isMatch)
                return callback(null, false);
            // Success
            return callback(null, user);
        });
    });
}));
passport.use('client-basic', new passport_http_1.BasicStrategy(function (id, secret, callback) {
    client_1.Client.findOne({ id: id }, function (err, client) {
        if (err)
            return callback(err);
        // No client found with that id
        if (!client)
            return callback(null, false);
        // Make sure the secret is correct
        client.verifySecret(secret, function (err, isMatch) {
            if (err)
                return callback(err);
            // Password did not match
            if (!isMatch)
                return callback(null, false);
            // Success
            console.log('Client is Authenticated ');
            return callback(null, client);
        });
    });
}));
passport.use(new BearerStrategy(function (accessToken, callback) {
    token_1.Token.findOne({ value: accessToken }, function (err, token) {
        if (err)
            return callback(err);
        // No token found
        if (!token)
            return callback(null, false);
        user_1.User.findOne({ _id: token.userId }, function (err, user) {
            if (err) {
                return callback(err);
            }
            // No user found
            if (!user) {
                return callback(null, false);
            }
            // Simple example with no scope
            callback(null, user, { scope: '*' });
        });
    });
}));
var AuthController = (function () {
    function AuthController() {
        this.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session: false });
        this.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
        this.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
    }
    return AuthController;
}());
exports.AuthController = AuthController;

//# sourceMappingURL=../../build/controllers/auth.js.map
