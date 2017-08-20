"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../models/client");
var ClientController = (function () {
    function ClientController() {
    }
    ClientController.prototype.getClients = function (req, res) {
        client_1.Client.find({ userId: req.user.id }, function (err, clients) {
            if (err)
                return res.send(err);
            res.json(clients);
        });
    };
    ClientController.prototype.postClients = function (req, res) {
        var client = new client_1.Client({
            name: req.body.name,
            id: req.body.id,
            secret: req.body.secret,
            userId: req.user.id
        });
        client.save(function (err) {
            if (err)
                return res.send(err);
            res.json({ message: 'Client added to the server!', data: client });
        });
    };
    return ClientController;
}());
exports.ClientController = ClientController;

//# sourceMappingURL=../../build/controllers/client.js.map
