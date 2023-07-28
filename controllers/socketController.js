const baseResponse = require('../config/baseResponseStatus');
const { response, errResponse } = require('../config/response');
const deliveryService = require('../services/deliveryService');
const adminService = require('../services/adminService');

module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('getLists', getLists);

        async function getLists() {
            try {
                const result = await adminService.findAllDelivery();
                // res.send(response(baseResponse.SUCCESS, result));
                io.sockets.emit(
                    'getLists',
                    response(baseResponse.SUCCESS, result)
                );
            } catch (err) {
                console.log(err);
                io.sockets.emit(
                    'getLists',
                    errResponse(baseResponse.SERVER_ERROR)
                );
            }
        }
    });
};
