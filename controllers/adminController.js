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
    signIn: async function (req, res) {
        let phoneNumber = req.body.phoneNumber;
        let password = req.body.password;
        let session = req.session;
        try {
            const result = await adminService.signIn(
                phoneNumber,
                password,
                session
            );
            console.log('login', result);
            if (result != null) {
                res.status(200).send(true);
            } else {
                res.status(200).send(false);
            }
        } catch (err) {
            console.log(err);
            res.status(400).send('로그인 오류');
        }
    },
};
