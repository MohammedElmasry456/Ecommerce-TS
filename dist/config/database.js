"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = () => {
    mongoose_1.default
        .connect(process.env.DB)
        .then((link) => {
        console.log(`Database connected successfully | ${link.connection.host}`);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.default = connectDatabase;
