const { sequelize } = require('../models/index');
const deliveryService = require('../services/deliveryService');
const ResponseDto = require('../dto/ResponseDto');

module.exports = {
    orderDelivery: async function (req, res) {
        let transaction = await sequelize.transaction();
        try {
            await deliveryService.createDelivery(req, transaction);
            await transaction.commit();
            res.status(200).send({ statusCode: 200, res: '배송 접수 성공' });
        } catch (err) {
            await transaction.rollback();
            console.log(err);
            res.status(400).send({ statusCode: 400, res: '배송 접수 실패' });
        }
    },
};
