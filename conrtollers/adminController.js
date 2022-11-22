const { delivery, user, sequelize } = require('../models');
const adminService = require('../services/adminService');

module.exports = {
    getAllDeliveryList: async function (req, res) {
        try {
            const result = await adminService.findAllDelivery();
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            res.status(400).send(false);
        }
    },
};
