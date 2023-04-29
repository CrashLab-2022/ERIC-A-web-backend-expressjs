const { delivery, user, Sequelize } = require('../models');

module.exports = {
    createUser: async function (
        phoneNumber,
        name,
        hashedPassword,
        salt,
        transaction
    ) {
        await user.create(
            {
                phoneNumber: phoneNumber,
                name: name,
                password: hashedPassword,
                salt: salt,
                status: 1,
            },
            { transaction: transaction }
        );
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
