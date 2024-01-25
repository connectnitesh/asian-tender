const authService = require('../services/authService');
const tenderService = require('../services/tenderService');

const adminLogin = async (req, res) => {
    try {
        const _resp = await authService.login(req, res);
        return res.status(200).send({ status: "SUCCESS", data: _resp });
    }
    catch (error) {
        return res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

const adminSignup = async (req, res) => {
    try {
        const _resp = await authService.signup(req, res);
        return res.status(200).send({ status: "SUCCESS", data: _resp });
    }
    catch (error) {
        return res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

const listTender = async (req, res) => {
    try {
        const _resp = await tenderService.list(req, res);
        return res.status(200).send({ status: "SUCCESS", data: _resp });
    }
    catch (error) {
        return res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

const addTender = async (req, res) => {
    try {
        const _resp = await tenderService.add(req, res);
        return res.status(200).send({ status: "SUCCESS", data: _resp });
    }
    catch (error) {
        return res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

const deleteTender = async (req, res) => {
    try {
        const _resp = await tenderService.delete(req, res);
        return res.status(200).send({ status: "SUCCESS", data: _resp });
    }
    catch (error) {
        return res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

module.exports = { adminLogin, adminSignup, listTender, addTender, deleteTender };
