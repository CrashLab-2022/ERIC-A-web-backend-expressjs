const baseResponse = require('../config/baseResponseStatus');
const { response, errResponse } = require('../config/response');

module.exports = (req, res, next) => {
    if (req.session.isLogined !== undefined) {
        if (req.session.isAdmin) {
            next();
        } else {
            res.send(errResponse(baseResponse.BAD_REQUEST));
        }
    } else {
        res.send(errResponse(baseResponse.BAD_REQUEST));
    }
};
