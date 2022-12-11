const { delivery, user, sequelize } = require('../models');
const ResponseDto = require('../dto/ResponseDto');
const request = require('request');

let url = 'https://angry-olives-cross-211-36-150-124.loca.lt';

module.exports = {
    openDoor: async function (req, res) {
        let id = req.params.id;
        try {
            let result = await controlService.setOpen(id);
            if (result) {
                res.status(200).send(true);
            } else {
                res.status(200).send(false);
            }
        } catch (err) {
            console.log(err);
            res.status(400).send(false);
        }
    },
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
