"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CodeSchema = new mongoose_1.Schema({
    value: {
        type: String,
        required: true
    },
    redirectUri: {
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
exports.Code = mongoose_1.model('Code', CodeSchema);

//# sourceMappingURL=../../build/models/code.js.map
