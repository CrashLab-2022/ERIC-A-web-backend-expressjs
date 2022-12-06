const { delivery, user, Sequelize } = require('../models');

module.exports = {
    createUser: async function (req, transaction) {
        await user.create(
            {
                phoneNumber: req.body.phoneNumber,
                name: req.body.name,
                password: req.body.password,
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
    signIn: async function (phoneNumber, password, session) {
        const userResult = await user.findOne({
            where: { phoneNumber: phoneNumber, password: password },
        });
        if ((userResult == null) | (userResult.dataValues.status == 1)) {
            return null;
        } else {
            session.phoneNumber = userResult.dataValues.phoneNumber;
            session.name = userResult.dataValues.name;
            session.isLogined = true;
            session.cookie.httpOnly = false;
            console.log(session);
            session.save(function () {});
            return userResult;
        }
    },
};
