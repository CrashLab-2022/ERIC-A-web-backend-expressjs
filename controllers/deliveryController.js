const baseResponse = require('../config/baseResponseStatus');
const { response, errResponse } = require('../config/response');
const { delivery, user, sequelize } = require('../models');
const deliveryService = require('../services/deliveryService');
const request = require('request');
require('dotenv').config();

module.exports = {
    orderDelivery: async function (req, res) {
        let transaction = await sequelize.transaction();
        try {
            await deliveryService.createDelivery(req, transaction);
            await transaction.commit();
            res.send(response(baseResponse.SUCCESS));
        } catch (err) {
            await transaction.rollback();
            console.log(err);
            res.send(errResponse(baseResponse.SERVER_ERROR));
        }
    },
    getDeliveryList: async function (req, res) {
        let phoneNumber = req.params.phoneNumber;
        try {
            const result = await deliveryService.findDeliveryByPN(phoneNumber);
            res.send(response(baseResponse.SUCCESS, result));
        } catch (err) {
            console.log(err);
            res.send(errResponse(baseResponse.SERVER_ERROR));
        }
    },
};
