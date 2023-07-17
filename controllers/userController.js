const { sequelize } = require('../models/index');
const userService = require('../services/userService');
const baseResponse = require('../config/baseResponseStatus');
const { response, errResponse } = require('../config/response');

module.exports = {
    signUp: async function (req, res) {
        let phoneNumber = req.body.phoneNumber;
        let name = req.body.name;
        let password = req.body.password;
        try {
            let createResult = await userService.createUser(
                phoneNumber,
                name,
                password
            );
            if (createResult.isSuccess) {
                let session = req.session;
                session.phoneNumber = phoneNumber;
                session.name = name;
                session.isLogined = true;
                session.isAdmin = false;
                session.cookie.httpOnly = false;
                session.save(function () {});
            }
            res.send(createResult);
        } catch (err) {
            console.log(err);
            res.send(errResponse(baseResponse.SERVER_ERROR));
        }
    },
    checkPhoneNumber: async function (req, res) {
        try {
            const phoneNumber = req.params.phoneNumber;
            const userResult = await userService.findByPhoneNumber(phoneNumber);
            if (userResult == null) {
                res.status(200).send({
                    statusCode: 200,
                    res: true,
                });
            } else {
                res.status(200).send({
                    statusCode: 200,
                    res: false,
                });
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({ statusCode: 400, res: '중복 조회 실패' });
        }
    },
    signIn: async function (req, res) {
        let phoneNumber = req.body.phoneNumber;
        let password = req.body.password;
        let session = req.session;
        try {
            const userResult = await userService.findByPhoneNumber(phoneNumber);
            if (userResult == null) {
                res.status(200).send(false);
            } else {
                const verified = await userService.verifyPassword(
                    phoneNumber,
                    password
                );
                if (verified.result) {
                    session.phoneNumber = userResult.dataValues.phoneNumber;
                    session.name = userResult.dataValues.name;
                    session.isLogined = true;
                    session.isAdmin = false;
                    session.cookie.httpOnly = false;
                    session.save(function () {});
                    res.status(200).send(true);
                } else {
                    res.status(200).send(false);
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send('로그인 오류');
        }
    },
    checkLogin: async function (req, res) {
        if (req.session.isLogined !== undefined) {
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    },
    signOut: async function (req, res) {
        if (req.session.isLogined !== undefined) {
            req.session.destroy(function (err) {
                if (err) {
                    res.status(400).send(false);
                }
                res.status(200).send(true);
            });
        } else {
            res.status(500).send(false);
        }
    },
    getSession: async function (req, res) {
        if (req.session.isLogined !== undefined) {
            res.status(200).send(req.session);
        } else {
            res.status(200).send(false);
        }
    },
};
