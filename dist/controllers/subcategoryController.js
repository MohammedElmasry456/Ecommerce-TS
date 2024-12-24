"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubcategory = exports.updateSubcategory = exports.getSubcategory = exports.getSubcategories = exports.createSubcategory = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const subcategoryModel_1 = __importDefault(require("../models/subcategoryModel"));
exports.createSubcategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newSubcategory = yield subcategoryModel_1.default.create(req.body);
    res.status(201).json({ data: newSubcategory });
}));
exports.getSubcategories = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subcategories = yield subcategoryModel_1.default.find();
    res.status(200).json({ data: subcategories });
}));
exports.getSubcategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subcategory = yield subcategoryModel_1.default.findById(req.params.id);
    res.status(200).json({ data: subcategory });
}));
exports.updateSubcategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subcategory = yield subcategoryModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: subcategory });
}));
exports.deleteSubcategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subcategory = yield subcategoryModel_1.default.findByIdAndDelete(req.params.id);
    res.status(204).json();
}));
