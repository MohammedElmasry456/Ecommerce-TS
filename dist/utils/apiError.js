"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith("4") ? "failed" : "error";
        this.isOperational = true;
    }
}
exports.default = ApiError;
