const { delivery, user } = require('../models');

module.exports = {
    createDelivery: async function (req, transaction) {
        await delivery.create(
            {
                departure: req.body.departure,
                destination: req.body.destination,
                item: req.body.item,
                inPerson: req.body.isInPerson,
                userId: req.body.userId,
            },
            { transaction: transaction }
        );
    },
};
