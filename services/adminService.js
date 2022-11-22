const { delivery, user } = require('../models');

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
                time: d.dataValues.time,
            });
        }
        return result;
    },
};
