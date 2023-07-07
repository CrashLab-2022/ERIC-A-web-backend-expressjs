const { sequelize } = require('../models/index');
const userService = require('../services/userService');
const ResponseDto = require('../dto/ResponseDto');
let crypto = require('crypto');

const createSalt = async function () {
    const buf = await crypto.randomBytes(64);
    return buf.toString('base64');
};

const createHashedPassword = async function (password) {
    const salt = await createSalt();
    const key = await crypto.pbkdf2Sync(password, salt, 104906, 64, 'sha512');
    const hashedPassword = key.toString('base64');
    return { hashedPassword, salt };
};

const verifyPassword = async function (password, salt, hashedPassword) {
    const key = await crypto.pbkdf2Sync(password, salt, 104906, 64, 'sha512');
    const hPassword = key.toString('base64');
    console.log(hPassword);
    if (hPassword == hashedPassword) return true;
    return false;
};

module.exports = {
    signUp: async function (req, res) {
        let transaction = await sequelize.transaction();
        let hashedResult = await createHashedPassword(req.body.password);
        let hashedPassword = hashedResult.hashedPassword;
        let salt = hashedResult.salt;
        let phoneNumber = req.body.phoneNumber;
        let name = req.body.name;
        try {
            await userService.createUser(
                phoneNumber,
                name,
                hashedPassword,
                salt,
                transaction
            );
            await transaction.commit();
            res.status(200).send({ statusCode: 200, res: '회원가입 성공' });
        } catch (err) {
            await transaction.rollback();
            console.log(err);
            res.status(400).send({ statusCode: 400, res: '회원가입 실패' });
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
                let hashedPassword = userResult.password;
                let salt = userResult.salt;
                const verified = await verifyPassword(
                    password,
                    salt,
                    hashedPassword
                );
                if (verified) {
                    session.phoneNumber = userResult.dataValues.phoneNumber;
                    session.name = userResult.dataValues.name;
                    session.isLogined = true;
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
