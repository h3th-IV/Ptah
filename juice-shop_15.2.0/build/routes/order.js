"use strict";
/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const basket_1 = require("../models/basket");
const product_1 = require("../models/product");
const basketitem_1 = require("../models/basketitem");
const quantity_1 = require("../models/quantity");
const delivery_1 = require("../models/delivery");
const wallet_1 = require("../models/wallet");
const challengeUtils = require("../lib/challengeUtils");
const config_1 = __importDefault(require("config"));
const utils = __importStar(require("../lib/utils"));
const fs = require('fs');
const PDFDocument = require('pdfkit');
const security = require('../lib/insecurity');
const products = require('../data/datacache').products;
const challenges = require('../data/datacache').challenges;
const db = require('../data/mongodb');
module.exports = function placeOrder() {
    return (req, res, next) => {
        const id = req.params.id;
        basket_1.BasketModel.findOne({ where: { id }, include: [{ model: product_1.ProductModel, paranoid: false, as: 'Products' }] })
            .then(async (basket) => {
            var _a, _b;
            if (basket != null) {
                const customer = security.authenticatedUsers.from(req);
                const email = customer ? customer.data ? customer.data.email : '' : '';
                const orderId = security.hash(email).slice(0, 4) + '-' + utils.randomHexString(16);
                const pdfFile = `order_${orderId}.pdf`;
                const doc = new PDFDocument();
                const date = new Date().toJSON().slice(0, 10);
                const fileWriter = doc.pipe(fs.createWriteStream(path.join('ftp/', pdfFile)));
                fileWriter.on('finish', async () => {
                    void basket.update({ coupon: null });
                    await basketitem_1.BasketItemModel.destroy({ where: { BasketId: id } });
                    res.json({ orderConfirmation: orderId });
                });
                doc.font('Times-Roman', 40).text(config_1.default.get('application.name'), { align: 'center' });
                doc.moveTo(70, 115).lineTo(540, 115).stroke();
                doc.moveTo(70, 120).lineTo(540, 120).stroke();
                doc.fontSize(20).moveDown();
                doc.font('Times-Roman', 20).text(req.__('Order Confirmation'), { align: 'center' });
                doc.fontSize(20).moveDown();
                doc.font('Times-Roman', 15).text(`${req.__('Customer')}: ${email}`, { align: 'left' });
                doc.font('Times-Roman', 15).text(`${req.__('Order')} #: ${orderId}`, { align: 'left' });
                doc.moveDown();
                doc.font('Times-Roman', 15).text(`${req.__('Date')}: ${date}`, { align: 'left' });
                doc.moveDown();
                doc.moveDown();
                let totalPrice = 0;
                const basketProducts = [];
                let totalPoints = 0;
                (_a = basket.Products) === null || _a === void 0 ? void 0 : _a.forEach(({ BasketItem, price, deluxePrice, name, id }) => {
                    if (BasketItem != null) {
                        challengeUtils.solveIf(challenges.christmasSpecialChallenge, () => { return BasketItem.ProductId === products.christmasSpecial.id; });
                        quantity_1.QuantityModel.findOne({ where: { ProductId: BasketItem.ProductId } }).then((product) => {
                            const newQuantity = product.quantity - BasketItem.quantity;
                            quantity_1.QuantityModel.update({ quantity: newQuantity }, { where: { ProductId: BasketItem === null || BasketItem === void 0 ? void 0 : BasketItem.ProductId } }).catch((error) => {
                                next(error);
                            });
                        }).catch((error) => {
                            next(error);
                        });
                        let itemPrice;
                        if (security.isDeluxe(req)) {
                            itemPrice = deluxePrice;
                        }
                        else {
                            itemPrice = price;
                        }
                        const itemTotal = itemPrice * BasketItem.quantity;
                        const itemBonus = Math.round(itemPrice / 10) * BasketItem.quantity;
                        const product = {
                            quantity: BasketItem.quantity,
                            id,
                            name: req.__(name),
                            price: itemPrice,
                            total: itemTotal,
                            bonus: itemBonus
                        };
                        basketProducts.push(product);
                        doc.text(`${BasketItem.quantity}x ${req.__(name)} ${req.__('ea.')} ${itemPrice} = ${itemTotal}¤`);
                        doc.moveDown();
                        totalPrice += itemTotal;
                        totalPoints += itemBonus;
                    }
                });
                doc.moveDown();
                const discount = calculateApplicableDiscount(basket, req);
                let discountAmount = '0';
                if (discount > 0) {
                    discountAmount = (totalPrice * (discount / 100)).toFixed(2);
                    doc.text(discount + '% discount from coupon: -' + discountAmount + '¤');
                    doc.moveDown();
                    totalPrice -= parseFloat(discountAmount);
                }
                const deliveryMethod = {
                    deluxePrice: 0,
                    price: 0,
                    eta: 5
                };
                if ((_b = req.body.orderDetails) === null || _b === void 0 ? void 0 : _b.deliveryMethodId) {
                    const deliveryMethodFromModel = await delivery_1.DeliveryModel.findOne({ where: { id: req.body.orderDetails.deliveryMethodId } });
                    if (deliveryMethodFromModel != null) {
                        deliveryMethod.deluxePrice = deliveryMethodFromModel.deluxePrice;
                        deliveryMethod.price = deliveryMethodFromModel.price;
                        deliveryMethod.eta = deliveryMethodFromModel.eta;
                    }
                }
                const deliveryAmount = security.isDeluxe(req) ? deliveryMethod.deluxePrice : deliveryMethod.price;
                totalPrice += deliveryAmount;
                doc.text(`${req.__('Delivery Price')}: ${deliveryAmount.toFixed(2)}¤`);
                doc.moveDown();
                doc.font('Helvetica-Bold', 20).text(`${req.__('Total Price')}: ${totalPrice.toFixed(2)}¤`);
                doc.moveDown();
                doc.font('Helvetica-Bold', 15).text(`${req.__('Bonus Points Earned')}: ${totalPoints}`);
                doc.font('Times-Roman', 15).text(`(${req.__('The bonus points from this order will be added 1:1 to your wallet ¤-fund for future purchases!')}`);
                doc.moveDown();
                doc.moveDown();
                doc.font('Times-Roman', 15).text(req.__('Thank you for your order!'));
                challengeUtils.solveIf(challenges.negativeOrderChallenge, () => { return totalPrice < 0; });
                if (req.body.UserId) {
                    if (req.body.orderDetails && req.body.orderDetails.paymentId === 'wallet') {
                        const wallet = await wallet_1.WalletModel.findOne({ where: { UserId: req.body.UserId } });
                        if ((wallet != null) && wallet.balance >= totalPrice) {
                            wallet_1.WalletModel.decrement({ balance: totalPrice }, { where: { UserId: req.body.UserId } }).catch((error) => {
                                next(error);
                            });
                        }
                        else {
                            next(new Error('Insufficient wallet balance.'));
                        }
                    }
                    wallet_1.WalletModel.increment({ balance: totalPoints }, { where: { UserId: req.body.UserId } }).catch((error) => {
                        next(error);
                    });
                }
                db.orders.insert({
                    promotionalAmount: discountAmount,
                    paymentId: req.body.orderDetails ? req.body.orderDetails.paymentId : null,
                    addressId: req.body.orderDetails ? req.body.orderDetails.addressId : null,
                    orderId,
                    delivered: false,
                    email: (email ? email.replace(/[aeiou]/gi, '*') : undefined),
                    totalPrice,
                    products: basketProducts,
                    bonus: totalPoints,
                    deliveryPrice: deliveryAmount,
                    eta: deliveryMethod.eta.toString()
                }).then(() => {
                    doc.end();
                });
            }
            else {
                next(new Error(`Basket with id=${id} does not exist.`));
            }
        }).catch((error) => {
            next(error);
        });
    };
};
function calculateApplicableDiscount(basket, req) {
    if (security.discountFromCoupon(basket.coupon)) {
        const discount = security.discountFromCoupon(basket.coupon);
        challengeUtils.solveIf(challenges.forgedCouponChallenge, () => { return discount >= 80; });
        return discount;
    }
    else if (req.body.couponData) {
        const couponData = Buffer.from(req.body.couponData, 'base64').toString().split('-');
        const couponCode = couponData[0];
        const couponDate = Number(couponData[1]);
        const campaign = campaigns[couponCode];
        if (campaign && couponDate == campaign.validOn) { // eslint-disable-line eqeqeq
            challengeUtils.solveIf(challenges.manipulateClockChallenge, () => { return campaign.validOn < new Date().getTime(); });
            return campaign.discount;
        }
    }
    return 0;
}
const campaigns = {
    WMNSDY2019: { validOn: new Date('Mar 08, 2019 00:00:00 GMT+0100').getTime(), discount: 75 },
    WMNSDY2020: { validOn: new Date('Mar 08, 2020 00:00:00 GMT+0100').getTime(), discount: 60 },
    WMNSDY2021: { validOn: new Date('Mar 08, 2021 00:00:00 GMT+0100').getTime(), discount: 60 },
    WMNSDY2022: { validOn: new Date('Mar 08, 2022 00:00:00 GMT+0100').getTime(), discount: 60 },
    WMNSDY2023: { validOn: new Date('Mar 08, 2023 00:00:00 GMT+0100').getTime(), discount: 60 },
    ORANGE2020: { validOn: new Date('May 04, 2020 00:00:00 GMT+0100').getTime(), discount: 50 },
    ORANGE2021: { validOn: new Date('May 04, 2021 00:00:00 GMT+0100').getTime(), discount: 40 },
    ORANGE2022: { validOn: new Date('May 04, 2022 00:00:00 GMT+0100').getTime(), discount: 40 },
    ORANGE2023: { validOn: new Date('May 04, 2023 00:00:00 GMT+0100').getTime(), discount: 40 }
};
//# sourceMappingURL=order.js.map