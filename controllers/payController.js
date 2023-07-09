const got = require('got');
const uuid = require('uuid').v4;
const baseResponse = require('../config/baseResponseStatus');
const { response, errResponse } = require('../config/response');

var secretKey = 'test_sk_qLlDJaYngroWyBL566xrezGdRpXx';

module.exports = {
    pay: async function (req, res) {
        const data = {
            title: '구매하기',
            orderId: uuid(),
            orderName: '상품',
            price: 50000,
            customerName: '김해달',
            customerKey: uuid(),
        };

        res.render('index', data);
    },
    success: async function (req, res) {
        got.post('https://api.tosspayments.com/v1/payments/confirm', {
            headers: {
                Authorization:
                    'Basic ' + Buffer.from(secretKey + ':').toString('base64'),
                'Content-Type': 'application/json',
            },
            json: {
                orderId: req.query.orderId,
                amount: req.query.amount,
                paymentKey: req.query.paymentKey,
            },
            responseType: 'json',
        })
            .then(function (response) {
                console.log(response.body);
                // TODO: 구매 완료 비즈니스 로직 구현

                res.render('success', {
                    title: '성공적으로 구매했습니다',
                    amount: response.body.totalAmount,
                });
            })
            .catch(function (error) {
                res.redirect(
                    `/fail?code=${error.response?.body?.code}&message=${error.response?.body?.message}`
                );
            });
    },
    fail: async function (req, res) {
        res.render('fail', {
            message: req.query.message,
            code: req.query.code,
        });
    },
};
