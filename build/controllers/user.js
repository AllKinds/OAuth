"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
// export function postPerson(req, res) {
//     res.json({ message: 'Person added to DB'});
// }
var UserController = (function () {
    function UserController() {
        this.postUser = function (req, res) {
            var user = new user_1.User({
                id: req.body.id,
                password: '1234',
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                mail: req.body.mail,
            });
            user.save(function (err) {
                if (err)
                    return res.send(err);
                res.json({ message: 'New user created!' });
            });
        };
    }
    UserController.prototype.getUsers = function (req, res) {
        user_1.User.find({}, function (err, users) {
            if (err)
                return res.send(err);
            res.json(users);
        });
    };
    UserController.prototype.getMyUser = function (req, res) {
        user_1.User.findOne({ _id: req.user._id })
            .select('-password -_id -__v')
            .exec(function (err, user) {
            if (err)
                return res.send(500);
            return res.json(user);
        });
    };
    UserController.prototype.getUserData = function (req, res) {
        var id = req.params.user_id;
        user_1.User.findOne({ id: id })
            .select('-password')
            .exec(function (err, user) {
            if (err)
                return res.send(err);
            res.json(user);
        });
    };
    return UserController;
}());
exports.UserController = UserController;

//# sourceMappingURL=../../build/controllers/user.js.map
