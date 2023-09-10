const AuthSchema = require('../models/auth_model.js');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const user = await AuthSchema.findOne(email);

        if (user) {

            return res.status(500).json({ msg: "böyle bir kullanıcı zaten var" })

        }
        if (password.lenght < 6) {

            return res.status(500).json({ msg: "Şifreniz 6 karakterden küçük olmamalı!" })

        }

        const passwordHash = await bycrpt.hash(password, 12);

        if (!isEmail(email)) {

            return res.status(500).json({ msg: "Lütfen geçerli bir mail adresi giriniz !" })

        }

        const newUser = await AuthSchema.create({ username, email, password: passwordHash })


        const token = jwt.sign({ id: newUser._id }, "Secret_KEY", { expiresIn: '1h' })  //expiresIn zaman verildi

        

        res.status(201).json({ 
            status: "OK",
            newUser,
            token
        })

    } catch (error) {

        return res.status(500).json({ msg: error.message })
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await AuthSchema.findOne(email)


        if (!user) {

            return res.status(500).json({ msg: "Böyle bir kullanıcı bulunamadı" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare) {

            return res.status(500).json({ msg: "Kullanıcı adı veya şifre yanlış" })
        }


        const token = jwt.sign({ id: user._id }, "Secret_KEY", { expiresIn: '1h' })  //expiresIn zaman verildi


        res.status(200).json({ 
            status: "OK", 
            user, 
            token
        })



    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

function isEmail(email) {
    return emailRegex.test(email);
}




console.log(isValidEmail); // true

module.exports = { register, login }