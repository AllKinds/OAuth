"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TokenSchema = new mongoose_1.Schema({
    value: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    }
});
exports.Token = mongoose_1.model('Token', TokenSchema);

//# sourceMappingURL=../../build/models/token.js.map
