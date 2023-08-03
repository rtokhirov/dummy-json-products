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
exports.getProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const columns = { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, };
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { search, price, title, discountPercentage, rating, } = req.query;
        let limit = req.query.limit ? req.query.limit : 20;
        let skip = req.query.skip ? req.query.skip : 0;
        let sorts = { price, rating, title, discountPercentage, };
        let queryOBJ = {};
        let sort = {};
        Object.keys(sorts).forEach(key => {
            console.log(key, ": ", sorts[key]);
            if (sorts[`${key}`] == 1) {
                sort[`${key}`] = 1;
            }
            else if (sorts[`${key}`] == -1) {
                sort[`${key}`] = -1;
            }
        });
        console.log(sort);
        if (limit > 0 && skip >= 0) {
            if (typeof search == "string") {
                queryOBJ = {
                    $or: [
                        { brand: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { title: { $regex: search, $options: 'i' } },
                        { category: { $regex: search, $options: 'i' } },
                    ]
                };
            }
            // main mongoose query
            const products = yield product_model_1.default.find(queryOBJ, columns, {
                limit,
                skip,
                sort
            });
            // total count of products
            const total = (yield product_model_1.default.find(queryOBJ).countDocuments()) + "";
            // final response
            res.status(200).send({ products, total, limit: limit > total ? total : limit, skip });
        }
        else {
            // limit or skip is not specified
            res.status(400).send({ message: "Bad Request" });
        }
    }
    catch (error) {
        res.status(400).send({
            message: error.message,
        });
        console.log(error);
    }
});
exports.getProducts = getProducts;
