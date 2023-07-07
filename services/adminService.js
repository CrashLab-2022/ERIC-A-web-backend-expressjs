const { delivery, user } = require('../models');
let crypto = require('crypto');
const baseResponse = require('../config/baseResponseStatus');
const { response, errResponse } = require('../config/response');

module.exports = {
    findAllDelivery: async function () {
        const deliveryResult = await delivery.findAll();
        const result = [];
        for (let i = 0; i < deliveryResult.length; i++) {
            d = deliveryResult[i];
            result.push({
                id: d.dataValues.id,
                name: d.dataValues.name,
                phoneNumber: d.dataValues.phoneNumber,
                destination: d.dataValues.destination,
                isInPerson: d.dataValues.inPerson
                    ? '직접 수령하기'
                    : '두고 가기',
                item: d.dataValues.item,
                status: d.dataValues.status,
                date: d.dataValues.date,
                isAccepted: d.dataValues.isAccepted,
                time: d.dataValues.time,
            });
        }
        return result;
    },
    verifyPassword: async (phoneNumber, password) => {
        try {
            let userResult = await user.findOne({
                where: {
                    phoneNumber,
                    isAdmin: 1,
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
    createAdmin: async function (phoneNumber, name, password) {
        let salt = crypto.randomBytes(64).toString('base64');
        let hashedPassword = crypto
            .pbkdf2Sync(password, salt, 12345, 64, 'sha512')
            .toString('base64');
        await user.create({
            phoneNumber: phoneNumber,
            name: name,
            password: hashedPassword,
            salt: salt,
            isAdmin: 1,
        });
        return response(baseResponse.SUCCESS);
    },
};
