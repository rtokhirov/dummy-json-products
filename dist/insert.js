"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertProduct = void 0;
const product_model_1 = __importDefault(require("./models/product.model"));
const products_1 = require("./products");
const insertProduct = () => {
    products_1.products.forEach(product => {
        product_model_1.default.create(product);
    });
};
exports.insertProduct = insertProduct;
