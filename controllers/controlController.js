const { delivery, user, sequelize } = require('../models');
const ResponseDto = require('../dto/ResponseDto');
const request = require('request');
require('dotenv').config();

let url = process.env.APPURL;

module.exports = {
    userOpen: async function (req, res) {
        try {
            request(url + '/useropen', function (error, response, body) {
                console.log(body);
                res.status(200).send(body);
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(body);
        }
    },
    adminOpen: async function (req, res) {
        try {
            request(url + '/adminopen', function (error, response, body) {
                console.log(body);
                res.status(200).send(body);
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(body);
        }
    },
    adminClose: async function (req, res) {
        try {
            request(url + '/adminclose', function (error, response, body) {
                console.log(body);
                res.status(200).send(body);
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(body);
        }
    },
    adminStart: async function (req, res) {
        try {
            request(url + '/adminstart', function (error, response, body) {
                console.log(body);
                res.status(200).send(body);
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(body);
        }
    },
};
