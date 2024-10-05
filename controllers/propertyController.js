import { check, validationResult } from 'express-validator';

function getSeeMyProperties(req, res) {
    res.render('property/admin', {
        page: 'Mis Propiedades',
        navbar: true
    });
}

function getCreateProperty(req, res) {
    res.render('property/create', {
        page: 'Crear Propiedad',
        navbar: true,
        csrfToken: req.csrfToken()
    });
}

async function postCreateProperty(req, res) {
    console.log(req.body);
    res.send('Recibido');
}

export {
    getSeeMyProperties,
    getCreateProperty,
    postCreateProperty
}