const got = require('got');
var { resolve } = require('path');
const baseResponse = require('../config/baseResponseStatus');
const { response, errResponse } = require('../config/response');

var secretKey = 'test_sk_qLlDJaYngroWyBL566xrezGdRpXx';

module.exports = {
    pay: async function (req, res) {
        var path = resolve('./client/index.html');
        res.sendFile(path);
    },
    success: async function (req, res) {
        var { paymentKey, orderId, amount } = req.query;

        var encryptedSecretKey =
            'Basic ' + Buffer.from(secretKey + ':').toString('base64');

        got.post('https://api.tosspayments.com/v1/payments/confirm', {
            headers: {
                Authorization: encryptedSecretKey,
                'Content-Type': 'application/json',
            },
            json: {
                orderId: orderId,
                amount: amount,
                paymentKey: paymentKey,
            },
            responseType: 'json',
        })
            .then(function (response) {
                console.log(response.body);
                // TODO: 구매 완료 비즈니스 로직 구현

                var path = resolve('./client/success.html');
                res.sendFile(path);
            })
            .catch(function (error) {
                res.redirect(
                    `/fail?code=${error.response?.body?.code}&message=${error.response?.body?.message}`
                );
            });
    },
    fail: async function (req, res) {
        var path = resolve('./client/fail.html');
        res.sendFile(path);
    },
};
