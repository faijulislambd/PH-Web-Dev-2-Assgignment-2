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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const order_model_1 = require("../order.model");
const createOrderInDb = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const order = new order_model_1.OrderModel(orderData);
    const result = yield order.save();
    return result;
});
const getAllOrdersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find();
    return result;
});
const getSingleOrderFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.findOne({ id });
    return result;
});
const calculateRevenueFromOrderDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.aggregate([
        //Stage one getting the number of items ordered and the total price
        {
            $group: {
                _id: null,
                totalProductCount: { $sum: "$quantity" },
                totalPrice: { $sum: "$totalPrice" },
            },
        },
        //Stage two projecting the revenue
        {
            $project: {
                _id: 0,
                totalRevenue: { $multiply: ["$totalProductCount", "$totalPrice"] },
            },
        },
    ]);
    return result;
});
exports.orderServices = {
    createOrderInDb,
    getAllOrdersFromDb,
    getSingleOrderFromDb,
    calculateRevenueFromOrderDb,
};
