import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import User from '../models/User.js';
import { generateId } from '../helpers/tokens.js';
import { sendAccountConfirmationEmail, sendInstructionsToRecoverPassword } from '../helpers/emails.js';

// ------------------------------
// ----- Register Controller ----
// ------------------------------

function getRegister(req, res) {
    res.render('auth/register', {
        page: 'Crear Cuenta',
        csrfToken: req.csrfToken()
    });
}

async function postRegister(req, res) {
    console.log(req.body);
    // Validate user input
    await check('name', 'El nombre es requerido').notEmpty().run(req);
    await check('email').isEmail().withMessage('El email es requerido').run(req);
    await check('password').isStrongPassword().withMessage('La contraseña no es fuerte').run(req);
    await check('password_confirm').equals(req.body.password).withMessage('Las contraseñas no coinciden').run(req);

    const validation = validationResult(req);

    if(!validation.isEmpty()){
        console.log(validation.array());
        return res.render('auth/register', {
            page: 'Crear Cuenta',
            errors: validation.array(),
            user: {
                name: req.body.name,
                email: req.body.email
            },
            csrfToken: req.csrfToken()
        });
    }

    const userExists = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if(userExists){
        return res.render('auth/register', {
            page: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errors: [{
                msg: 'El email ya está registrado'
            }],
            user: {
                name: req.body.name,
                email: req.body.email
            }
        });
    }

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmed: false,
        token: generateId()
    });

    await sendAccountConfirmationEmail({
        email: user.email,
        name: user.name,
        token: user.token
    });

    res.render('templates/message', {
        page: 'Usuario creado exitosamente!',
        message: 'Revisa tu email para confirmar tu cuenta',
    });
    
}

async function getConfirmAccount(req, res, next) {

    let token = req.params.token;

    const user = await User.findOne({
        where: {
            token: token
        }
    });

    if(!user){
        return res.render('auth/confirm-account', {
            page: 'Error al confirmar cuenta',
            message: 'El token no es válido',
            error: true
        });
    }

    user.token = null;
    user.confirmed = true;
    await user.save();

    return res.render('auth/confirm-account', {
        page: 'Cuenta confirmada',
        message: 'Tu cuenta ha sido confirmada exitosamente',
        error: false
    });
}

function getLogin(req, res) {
  res.render('auth/login', {
    page: 'Iniciar Sesion',
    csrfToken: req.csrfToken()
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
        page: 'Recuperar Contraseña',
        csrfToken: req.csrfToken()
    });
}

async function postForgotPassword(req, res) {
    await check('email').isEmail().withMessage('El email es requerido').run(req);
   
    let validation = validationResult(req);

    if(!validation.isEmpty()){
        return res.render('auth/forgot-password', {
            page: 'Recuperar Contraseña',
            csrfToken: req.csrfToken(),
            errors: validation.array()
        });
    }

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if(!user){
        return res.render('auth/forgot-password', {
            page: 'Recuperar Contraseña',
            csrfToken: req.csrfToken(),
            errors: [{
                msg: 'El email no está registrado'
            }]
        });
    }

    user.token = generateId();
    await user.save();

    // Send email to user
    await sendInstructionsToRecoverPassword({
        email: user.email,
        name: user.name,
        token: user.token
    });

    // Redirect to message page
    res.render('templates/message', {
        page: 'Email enviado',
        message: 'Revisa tu email para restablecer tu contraseña'
    });
}

async function getResetPassword(req, res) {

    let token = req.params.token;

    const user = await User.findOne({
        where: {
            token: token
        }
    });

    if(!user){
        return res.render('auth/confirm-account', {
            page: 'Error al restablecer contraseña',
            message: 'El token no es válido',
            error: true
        })
    }

    // Render the reset password form
    return res.render('auth/reset-password', {
        page: 'Restablecer Contraseña',
        csrfToken: req.csrfToken()
    });
}

async function postResetPassword(req, res) {
    await check('password').isStrongPassword().withMessage('La contraseña no es fuerte').run(req);
    await check('password_confirm').equals(req.body.password).withMessage('Las contraseñas no coinciden').run(req);

    let validation = validationResult(req);

    if(!validation.isEmpty()){
        return res.render('auth/reset-password', {
            page: 'Restablecer Contraseña',
            csrfToken: req.csrfToken(),
            errors: validation.array()
        });
    }

    const { token } = req.params;

    // Get the user by token
    const user = await User.findOne({
        where: {
            token: token
        }
    });

    if(!user){
        return res.render('auth/confirm-account', {
            page: 'Error al restablecer contraseña',
            message: 'El token no es válido',
            error: true
        })
    }

    const salt = await bcrypt.genSalt(10);
    const { password } = req.body;
    user.password = await bcrypt.hash(password, salt);
    user.token = null;

    await user.save();

    return res.render('templates/message', {
        page: 'Contraseña restablecida',
        message: 'Tu contraseña ha sido restablecida exitosamente'
    });
}

export {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    getConfirmAccount,
    getForgotPassword,
    postForgotPassword,
    getResetPassword,
    postResetPassword,
    getLogout
}


