const tenderService = require("../services/tenderService");

const subscribe = async (req, res) => {
    try {
        const _resp = await tenderService.subscribe(req, res);
        return res.status(200).send({ status: "SUCCESS", data: _resp });
    }
    catch (error) {
        return res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

const listSubscriber = async (req, res) => {
    try {
        const _resp = await tenderService.listSubscriber(req, res);
        return res.status(200).send({ status: "SUCCESS", data: _resp });
    }
    catch (error) {
        return res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

module.exports = { subscribe, listSubscriber };
