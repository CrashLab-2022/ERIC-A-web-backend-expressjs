const { delivery, user, Sequelize } = require('../models');
let crypto = require('crypto');
const baseResponse = require('../config/baseResponseStatus');
const { response, errResponse } = require('../config/response');

module.exports = {
    createUser: async function (phoneNumber, name, password) {
        let salt = crypto.randomBytes(64).toString('base64');
        let hashedPassword = crypto
            .pbkdf2Sync(password, salt, 12345, 64, 'sha512')
            .toString('base64');
        await user.create({
            phoneNumber: phoneNumber,
            name: name,
            password: hashedPassword,
            salt: salt,
            isAdmin: 0,
        });
        return response(baseResponse.SUCCESS);
    },
    verifyPassword: async (phoneNumber, password) => {
        try {
            let userResult = await user.findOne({
                where: {
                    phoneNumber,
                },
            });
            if (userResult == null) {
                return errResponse(baseResponse.USER_USERID_NOT_EXIST);
            }
            let hashedPassword = crypto
                .pbkdf2Sync(password, userResult.salt, 12345, 64, 'sha512')
                .toString('base64');
            if (hashedPassword != userResult.password) {
                return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
            }
            return response(baseResponse.SUCCESS, true);
        } catch (err) {
            console.log(err);
            return errResponse(baseResponse.DB_ERROR);
        }
    },
    findByPhoneNumber: async function (phoneNumber) {
        const userResult = await user.findOne({
            where: { phoneNumber: phoneNumber },
        });
        return userResult;
    },
    findUserByPhoneNumber: async function (phoneNumber) {
        const userResult = await user.findOne({
            where: { phoneNumber: phoneNumber },
        });
        if (userResult == null) {
            return null;
        } else {
            return userResult.dataValues;
        }
    },
};
