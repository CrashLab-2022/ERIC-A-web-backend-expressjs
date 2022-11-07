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
};
