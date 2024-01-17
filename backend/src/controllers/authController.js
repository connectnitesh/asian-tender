const authService = require('../services/authService');
const {validationResult} = require('express-validator');

const login = async(req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const resData = await authService.login(req,res);
        console.log(resData)
        return res.status(resData.status).json(resData.data)
    }
    res.status(422).json({errors: errors.array()})
};

const signup = (req, res) => {
    // Implement signup logic using authService
    res.send('Signup functionality');
};

const passwordReset = (req, res) => {
    // Implement password reset logic using authService
    res.send('Password reset functionality');
};

module.exports = { login, signup, passwordReset };
