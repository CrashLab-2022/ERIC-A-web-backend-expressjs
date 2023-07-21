const baseResponse = require('../config/baseResponseStatus');
const { response, errResponse } = require('../config/response');
const { delivery, user, sequelize } = require('../models');
const adminService = require('../services/adminService');
const userService = require('../services/userService');

module.exports = {
    getAllDeliveryList: async function (req, res) {
        try {
            const result = await adminService.findAllDelivery();
            res.send(response(baseResponse.SUCCESS, result));
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
            const userResult = await userService.findByPhoneNumber(phoneNumber);
            const verified = await adminService.verifyPassword(
                phoneNumber,
                password
            );
            if (verified.result) {
                session.phoneNumber = userResult.dataValues.phoneNumber;
                session.name = userResult.dataValues.name;
                session.isLogined = true;
                session.isAdmin = true;
                session.cookie.httpOnly = false;
                session.save(function () {});
                res.status(200).send(true);
            } else {
                res.status(200).send(false);
            }
        } catch (err) {
            console.log(err);
            res.status(400).send('로그인 오류');
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
            if (createResult.isSuccess) {
                let session = req.session;
                session.phoneNumber = phoneNumber;
                session.name = name;
                session.isLogined = true;
                session.isAdmin = true;
                session.cookie.httpOnly = false;
                session.save(function () {});
            }
            res.send(createResult);
        } catch (err) {
            console.log(err);
            res.send(errResponse(baseResponse.SERVER_ERROR));
        }
    },
    getSession: async function (req, res) {
        if (req.session.isLogined !== undefined) {
            if (req.session.isAdmin) {
                res.status(200).send(req.session);
            } else {
                res.status(200).send(false);
            }
        } else {
            res.status(200).send(false);
        }
    },
    checkLogin: async function (req, res) {
        if (req.session.isLogined !== undefined) {
            if (req.session.isAdmin) {
                res.status(200).send(true);
            } else {
                res.status(200).send(false);
            }
        } else {
            res.status(200).send(false);
        }
    },
};
