const tenderService = require("../services/tenderService");

const search = async (req, res) => {
    try {
        const _resp = await tenderService.search(req, res);
        return res.status(200).send({ status: "SUCCESS", data: _resp });
    }
    catch (error) {
        return res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

const filterSearch = async (req, res) => {
    try {
        const _resp = await tenderService.filter(req, res);
        return res.status(200).send({ status: "SUCCESS", data: _resp });
    }
    catch (error) {
        return res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

const tenderDetails = async (req, res) => {
    try {
        const _resp = await tenderService.details(req, res);
        return res.status(200).send({ status: "SUCCESS", data: _resp });
    }
    catch (error) {
        return res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

const seed = async (req, res) => {
    try {
        const _resp = await tenderService.seed(req, res);
        return res.status(200).send({ status: "SUCCESS", message: _resp });
    }
    catch (error) {
        return res.status(error?.status || 500).send({ status: "FAILED", message: { error: error?.message || error } })
    }
};

module.exports = { search, filterSearch, tenderDetails, seed };
