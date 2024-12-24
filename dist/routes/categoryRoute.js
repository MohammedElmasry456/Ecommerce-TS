"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const CategoryRouter = (0, express_1.Router)();
CategoryRouter.route("/").post(categoryController_1.createCategory).get(categoryController_1.getCategories);
CategoryRouter.route("/:id")
    .get(categoryController_1.getCategory)
    .put(categoryController_1.updateCategory)
    .delete(categoryController_1.deleteCategory);
exports.default = CategoryRouter;
