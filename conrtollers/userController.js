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
    signIn: async function (req, res) {
        let phoneNumber = req.body.phoneNumber;
        let password = req.body.password;
        let session = req.session;
        try {
            const result = await userService.signIn(
                phoneNumber,
                password,
                session
            );
            console.log(result);
            if (result != null) {
                res.status(200).send(session);
            } else {
                res.status(500).send('회원 정보 불일치');
            }
        } catch (err) {
            console.log(err);
            res.status(400).send('로그인 오류');
        }
    },
    checkLogin: async function (req, res) {
        console.log(req.session);
        if (req.session.isLogined !== undefined) {
            console.log('session exist');
            res.status(200).send(true);
        } else {
            console.log('session not exist');
            res.status(200).send(false);
        }
    },
};
