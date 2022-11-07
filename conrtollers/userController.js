const { sequelize } = require('../models/index');
const userService = require('../services/userService');
const ResponseDto = require('../dto/ResponseDto');

module.exports = {
    signUp: async function (req, res) {
        let transaction = await sequelize.transaction();
        try {
            await userService.createUser(req, transaction);
            await transaction.commit();
            res.status(200).send({ statusCode: 200, res: '회원가입 성공' });
        } catch (err) {
            await transaction.rollback();
            console.log(err);
            res.status(400).send({ statusCode: 400, res: '회원가입 실패' });
        }
    },
    checkPhoneNumber: async function (req, res) {
        try {
            const phoneNumber = req.params.phoneNumber;
            const userResult = await userService.findByPhoneNumber(phoneNumber);
            if (userResult == null) {
                res.status(200).send({
                    statusCode: 200,
                    res: true,
                });
            } else {
                res.status(200).send({
                    statusCode: 200,
                    res: false,
                });
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({ statusCode: 400, res: '중복 조회 실패' });
        }
    },
};
