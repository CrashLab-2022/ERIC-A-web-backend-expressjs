const { delivery, user, sequelize } = require('../models');
const ResponseDto = require('../dto/ResponseDto');

module.exports = {
    openDoor: async function (req, res) {
        const request = require('request');
        request(
            'http://localhost:3005/opendoor',
            function (error, response, body) {
                res.status(200).send(body);
            }
        );
    },
    openDoor: async function (req, res) {
        const request = require('request');
        request(
            'http://localhost:3005/closedoor',
            function (error, response, body) {
                res.status(200).send(body);
            }
        );
    },
};
