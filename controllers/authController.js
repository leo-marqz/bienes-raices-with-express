
function getLoing(req, res) {
  res.render('login');
}

function postLogin(req, res) {
    res.send('Login');
}

function getRegister(req, res) {
    res.render('register');
}

function postRegister(req, res) {
    res.send('Register');
}

function getLogout(req, res) {
    res.send('Logout');
}

export {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    getLogout
}


