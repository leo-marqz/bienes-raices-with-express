import { check, validationResult } from 'express-validator';

import User from '../models/User.js';

// ------------------------------
// ----- Register Controller ----
// ------------------------------

function getRegister(req, res) {
    res.render('auth/register', {
        page: 'Crear Cuenta'
    });
}

async function postRegister(req, res) {
    // Validate user input
    await check('name', 'El nombre es requerido').notEmpty().run(req);
    await check('email').isEmail().withMessage('El email es requerido').run(req);
    await check('password').notEmpty().withMessage('La contraseña es requerida').run(req);
    await check('password').isStrongPassword().withMessage('La contraseña no es fuerte').run(req);
    await check('password_confirm').notEmpty().withMessage('La confirmación de la contraseña es requerida').run(req);

    const validation = validationResult(req);
    return res.json(validation);

    // const user = await User.create(req.body);
    // console.log(user);
    // res.json({
    //     message: 'Registration successful',
    //     statusCode: 200,
    //     content: user
    // });
}

// ----------------------------
// ----- Login Controller -----
// ----------------------------

function getLogin(req, res) {
  res.render('auth/login', {
    page: 'Iniciar Sesion'
  });
}

function postLogin(req, res) {
    res.json({
        message: 'Login successful',
        statusCode: 200
    });
}



function getLogout(req, res) {
    res.send('Logout');
}

function getForgotPassword(req, res) {
    res.render('auth/forgot-password', {
        page: 'Recuperar Contraseña'
    });
}

export {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    getForgotPassword,
    getLogout
}


