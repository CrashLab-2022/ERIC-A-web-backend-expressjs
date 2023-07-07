const baseResponse = require('../config/baseResponseStatus');
const { response, errResponse } = require('../config/response');
const { delivery, user, sequelize } = require('../models');
const adminService = require('../services/adminService');

module.exports = {
    getAllDeliveryList: async function (req, res) {
        try {
            const result = await adminService.findAllDelivery();
            res.send(response(baseResponse.SUCCESS));
        } catch (err) {
            console.log(err);
            res.send(errResponse(baseResponse.SERVER_ERROR));
        }
    },
    signIn: async function (req, res) {
        let phoneNumber = req.body.phoneNumber;
        let password = req.body.password;
        let session = req.session;
        try {
            const result = await adminService.signIn(
                phoneNumber,
                password,
                session
            );
            if (result != null) {
                res.send(response(baseResponse.SUCCESS));
            } else {
                res.send(errResponse(baseResponse.SIGNIN_WRONG));
            }
        } catch (err) {
            console.log(err);
            res.send(errResponse(baseResponse.SERVER_ERROR));
        }
    },
    signUp: async function (req, res) {
        let phoneNumber = req.body.phoneNumber;
        let name = req.body.name;
        let password = req.body.password;
        try {
            let createResult = await adminService.createAdmin(
                phoneNumber,
                name,
                password
            );
            res.send(createResult);
        } catch (err) {
            console.log(err);
            res.send(errResponse(baseResponse.SERVER_ERROR));
        }
    },
};
