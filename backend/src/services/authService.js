const { Mongoose } = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')


const authService = {
    login: async(req,res) => {
        return {status: 200, data: "Login Successfully"}
    },

    signup: async(req,res) => {
        const {name,email,contact,company,password} = req.body;
        const emailExists = await User.findOne({ email: email });
        if (emailExists) {
          return res.status(400).json({ error: 'Email already used' });
        }else{
            const saltRounds = 12;
            bcrypt.hash(password, saltRounds, function(err, hash) {
                const newUser = new User ({
                    name: name,
                    email: email,
                    contact: contact,
                    company: company,
                    password: hash,
                })

                newUser.save();
            });
            return {status: 200, data: "User Signup Successfull"}
        }
    },
    
}

module.exports = authService;