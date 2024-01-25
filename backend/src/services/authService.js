const User = require('../models/userModel');
const bcrypt = require('bcrypt')

const authService = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            const validUser = await bcrypt.compare(password,userExists.password);
            if(validUser)
                return {name: userExists.name, email: userExists.email}
            else
                throw {message: "Wrong Password!"}
        } else {
            throw {message: "User not found!"}
        }
    },

    signup: async (req, res) => {
        const { name, email, contact, company, password,role="user", subscription=false } = req.body;
        const emailExists = await User.findOne({ email: email });
        if (emailExists) {
            throw { status: 400, message: "User already present" }
        } else {
            const saltRounds = 12;
            const hash = await bcrypt.hash(password, saltRounds);
            const newUser = new User({
                name: name,
                email: email,
                contact: contact,
                company: company,
                password: hash,
                role: role,
                subscription: false
            })
            await newUser.save();
            return {name: newUser.name, email: newUser.email};
        }
    },

 
}


module.exports = authService;