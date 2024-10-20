import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import User from '../models/User.js';
import { generateId, jwtgen } from '../helpers/tokens.js';
import { sendAccountConfirmationEmail, sendInstructionsToRecoverPassword } from '../helpers/emails.js';

// ------------------------------
// ----- Register Controller ----
// ------------------------------

function getRegister(req, res) {
    res.render('auth/register', {
        page: 'Crear Cuenta',
        navbar: false,
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
            navbar: false,
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
            navbar: false,
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
        navbar: false,
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
            navbar: false,
            message: 'El token no es válido',
            error: true
        });
    }

    user.token = null;
    user.confirmed = true;
    await user.save();

    return res.render('auth/confirm-account', {
        page: 'Cuenta confirmada',
        navbar: false,
        message: 'Tu cuenta ha sido confirmada exitosamente',
        error: false
    });
}

function getLogin(req, res) {
  res.render('auth/login', {
    page: 'Iniciar Sesion',
    navbar: false,
    csrfToken: req.csrfToken()
  });
}

async function postLogin(req, res) {
    await check('email').isEmail().withMessage('El email es requerido').run(req);
    await check('password').notEmpty().withMessage('La contraseña es requerida').run(req);

    let validation = validationResult(req);

    if(!validation.isEmpty()){
        return res.render('auth/login', {
            page: 'Iniciar Sesion',
            navbar: false,
            csrfToken: req.csrfToken(),
            errors: validation.array()
        });
    }

    // Check if the user exists
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    
    if(!user){
        return res.render('auth/login', {
            page: 'Iniciar Sesion',
            navbar: false,
            csrfToken: req.csrfToken(),
            errors: [{
                msg: 'El usuario no existe!!'
            }]
        });
    }

    if(!user.confirmed){
        return res.render('auth/login', {
            page: 'Iniciar Sesion',
            navbar: false,
            csrfToken: req.csrfToken(),
            errors: [{
                msg: 'La cuenta no ha sido confirmada'
            }]
        });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if( !validPassword ){
        return res.render('auth/login', {
            page: 'Iniciar Sesion',
            navbar: false,
            csrfToken: req.csrfToken(),
            errors: [{
                msg: 'Las credenciales no son válidas'
            }]
        });
    }

    const token = jwtgen({
        id: user.id,
        name: user.name
    });

    return res.cookie('_token', token, {
        httpOnly: true,
        secure: process.env.APP_ENV === 'production',
        // sameSite: 'strict' 
    }).redirect('/');
}


function getLogout(req, res) {
    res.redirect('/auth/login');
}

function getForgotPassword(req, res) {
    res.render('auth/forgot-password', {
        page: 'Recuperar Contraseña',
        navbar: false,
        csrfToken: req.csrfToken()
    });
}

async function postForgotPassword(req, res) {
    await check('email').isEmail().withMessage('El email es requerido').run(req);
   
    let validation = validationResult(req);

    if(!validation.isEmpty()){
        return res.render('auth/forgot-password', {
            page: 'Recuperar Contraseña',
            navbar: false,
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
            navbar: false,
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
        navbar: false,
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
            navbar: false,
            message: 'El token no es válido',
            error: true
        })
    }

    // Render the reset password form
    return res.render('auth/reset-password', {
        page: 'Restablecer Contraseña',
        navbar: false,
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
            navbar: false,
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
            navbar: false,
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
        navbar: false,
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


