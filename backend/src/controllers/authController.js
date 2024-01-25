const authService = require('../services/authService');

const login = async(req, res) => {
        try{
            const _resp = await authService.login(req,res);
            return res.status(200).send({ status: "SUCCESS", data: _resp });
        }
        catch(error){
            return res.status(error?.status || 500).send({status: "FAILED", data: {error: error?.message || error}})
        }
};

const signup = async(req, res) => {
        try{
            const _resp = await authService.signup(req,res);
            return res.status(200).send({ status: "SUCCESS", data: _resp });
        }
        catch(error){
            return res.status(error?.status || 500).send({status: "FAILED", data: {error: error?.message || error}})
        }
};

module.exports = { login, signup };
