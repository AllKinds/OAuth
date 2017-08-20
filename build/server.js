"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
var morgan = require("morgan");
var user_1 = require("./controllers/user");
var userController = new user_1.UserController();
var auth_1 = require("./controllers/auth");
var authController = new auth_1.AuthController();
var oauth2_1 = require("./controllers/oauth2");
var oauth2Controller = new oauth2_1.OAuth2Controller();
var client_1 = require("./controllers/client");
var clientController = new client_1.ClientController();
// Connect to the fos MongoDB
mongoose.connect('mongodb://localhost:27017/fos', {
    useMongoClient: true,
});
// Create our Express application
var app = express();
// Set view engine to ejs
app.set('view engine', 'ejs');
// Dexter
app.use(morgan('dev'));
// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Use express session support since OAuth2orize requires it
app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));
// Use the passport package in our application
app.use(passport.initialize());
// Create our Express router
var router = express.Router();
// router.route('/persons')
//   .post(personController.postPerson);
// app.use('/oauth2/token', (req, res, next)=>{
//       console.log("Ba");
//       next();
// })
router.route('/users')
    .post(userController.postUser)
    .get(authController.isAuthenticated, userController.getUsers);
router.route('/user/:user_id')
    .get(authController.isAuthenticated, userController.getUserData);
router.route('/dudu')
    .get(authController.isAuthenticated, userController.getMyUser);
router.route('/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);
router.route('/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision);
router.route('/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);
// Register all our routes with /api
app.use('/api', router);
// Start the server
app.listen(3000);

//# sourceMappingURL=../build/server.js.map
