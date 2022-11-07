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
};
