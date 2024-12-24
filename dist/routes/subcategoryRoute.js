"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategoryController_1 = require("../controllers/subcategoryController");
const subcategoryRouter = (0, express_1.Router)();
subcategoryRouter.route("/").post(subcategoryController_1.createSubcategory).get(subcategoryController_1.getSubcategories);
subcategoryRouter
    .route("/:id")
    .get(subcategoryController_1.getSubcategory)
    .put(subcategoryController_1.updateSubcategory)
    .delete(subcategoryController_1.deleteSubcategory);
exports.default = subcategoryRouter;
