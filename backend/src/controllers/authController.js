const authService = require('../services/authService');
const {validationResult} = require('express-validator');

const login = async(req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const resData = await authService.login(req,res);
        return res.status(resData.status).json(resData.data)
    }
    res.status(422).json({errors: errors.array()})
};

const signup = async(req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const resData = await authService.signup(req,res);
        return res.status(resData.status).json(resData.data)
    }
    res.status(422).json({errors: errors.array()})
};

const passwordReset = (req, res) => {
    // Implement password reset logic using authService
    res.send('Password reset functionality');
};

module.exports = { login, signup, passwordReset };
