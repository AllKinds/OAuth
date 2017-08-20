"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.PersonSchema = new mongoose_1.Schema({
    id: String,
    firstName: String,
    lastName: String,
    phone: Number,
    mail: String
});
// Export the Mongoose model
exports.Person = mongoose_1.model('Person', exports.PersonSchema);

//# sourceMappingURL=../../build/models/person.js.map
