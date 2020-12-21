const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const pool = require('../dataBaseConnection');

exports.login = async (req, res) => {
    
    const { username, password } = req.body;

    const userData = {
        username,
        password
    }
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const userLogin = await pool.query('SELECT * FROM users WHERE username = ?', [userData.username]);
    
    if (!userLogin) {
        return res.status(400).json({ mensaje: 'USUARIO o Contraseña incorrectos' });
    }
    
    const passCheck = await bcryptjs.compare(password, userLogin[0].password);
    
    if (!passCheck) {
        return res.status(400).json({ mensaje: 'Usuario o Contraseña incorrecto' })
    }

    const jwt_payload = {
        user: {
            id: userLogin[0].id,
            user: userLogin[0].username,
            fullname: userLogin[0].fullname 
        }
    }

    try {
        const token = jsonwebtoken.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXP })
        userLogin[0].token = [token]
        console.log('Inside of try, log userlogin', userLogin);
        await pool.query('UPDATE users set ? WHERE id = ?', [userLogin[0], userLogin[0].id]);
        res.send({ message: 'Logueado Correctamente', token, id: userLogin[0].id, fullname: userLogin[0].fullname })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error when try to login' })
    }
}

exports.register = async (req, res) => {
    const { fullname, phoneNumber, email, password, username } = req.body;
    console.log('Data of register', req.body);
    const User = {
        fullname,
        phoneNumber,
        email,
        password,
        username
    }

    const salt = await bcryptjs.genSalt(10);

    User.password = await bcryptjs.hash(User.password, salt);

    try {
       await pool.query('INSERT INTO users SET ?', [User]);
       res.send('New user saved successfully'); 
    } catch (error) {
        console.log('Error on register', error);
    }
}

exports.logout = async (req, res) => {
    try {
        await pool.query('UPDATE users set ? WHERE user = ?', [{token: []}, req.body.user]);
        res.send({ mensaje: 'Logout Successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error', error })
    }
}