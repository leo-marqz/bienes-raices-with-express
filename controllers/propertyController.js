import { check, validationResult } from 'express-validator';

import Price  from '../models/Price.js';
import Category from '../models/Category.js';

function getSeeMyProperties(req, res) {
    res.render('property/admin', {
        page: 'Mis Propiedades',
        navbar: true
    });
}

//view property/create
async function getCreateProperty(req, res) {

    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]);

    res.render('property/create', {
        page: 'Crear Propiedad',
        navbar: true,
        csrfToken: req.csrfToken(),
        categories,
        prices
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