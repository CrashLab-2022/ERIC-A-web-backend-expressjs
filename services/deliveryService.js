const { delivery, user } = require('../models');

module.exports = {
    createDelivery: async function (req, transaction) {
        await delivery.create(
            {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
                departure: req.body.departure,
                destination: req.body.destination,
                item: req.body.item,
                inPerson: req.body.isInPerson,
            },
            { transaction: transaction }
        );
    },
};
