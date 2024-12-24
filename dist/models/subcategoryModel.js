"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subcategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("subcategories", subcategorySchema);
