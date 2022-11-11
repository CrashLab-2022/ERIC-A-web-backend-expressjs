const { delivery, user } = require('../models');

module.exports = {
    createDelivery: async function (req, transaction) {
        await delivery.create(
            {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                departure: req.body.departure,
                destination: req.body.destination,
                item: req.body.item,
                inPerson: req.body.isInPerson,
                status: req.body.status,
                userId: req.body.userId,
            },
            { transaction: transaction }
        );
    },
    findDeliveryByPN: async function (phoneNumber) {
        const deliveryResult = await delivery.findAll({
            where: { phoneNumber: phoneNumber },
        });
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
            });
        }
        console.log(result);
        return result;
    },
};
