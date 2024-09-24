
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

function getRegister(req, res) {
    res.render('auth/register', {
        page: 'Crear Cuenta'
    });
}

function postRegister(req, res) {
    res.json({
        message: 'Registration successful',
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


