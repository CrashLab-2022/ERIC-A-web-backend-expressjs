const { delivery, user, sequelize } = require('../models');
const ResponseDto = require('../dto/ResponseDto');
const request = require('request');

let url = 'https://nice-flowers-sniff-106-101-3-56.loca.lt';

module.exports = {
    open: async function (req, res) {
        try {
            console.log('open');
            request(url + '/open', function (error, response, body) {
                console.log(body);
                res.status(200).send(body);
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(body);
        }
    },
    test: async function (req, res) {
        request(url + '/index.html', function (error, response, body) {
            console.log(body);
            res.status(200).send(body);
        });
    },
};
