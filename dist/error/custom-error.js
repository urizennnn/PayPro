"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomAPIErrorHandler extends Error {
    constructor(message, StatusCode) {
        super(message);
        this.message = message;
        this.StatusCode = StatusCode;
    }
}
exports.default = CustomAPIErrorHandler;
