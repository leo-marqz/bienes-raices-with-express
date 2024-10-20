import { check, validationResult } from 'express-validator';

import { Category, Price } from '../models/index.js';

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

    await check('title').notEmpty().withMessage('El título es requerido').run(req);
    await check('description').notEmpty().withMessage('La descripción es requerida').run(req);
    await check('category').notEmpty().withMessage('La categoría es requerida').run(req);
    await check('price').notEmpty().withMessage('El precio es requerido').run(req);
    await check('rooms').notEmpty().withMessage('El número de habitaciones es requerido').run(req);
    await check('parking').notEmpty().withMessage('El número de parqueos es requerido').run(req);
    await check('wc').notEmpty().withMessage('El número de baños es requerido').run(req);
    
    await check('street').notEmpty().withMessage('La dirección es requerida').run(req);
    await check('latitude').notEmpty().withMessage('La latitud es requerida').run(req);
    await check('longitude').notEmpty().withMessage('La longitud es requerida').run(req);
    await check('image').notEmpty().withMessage('La imagen es requerida').run(req);

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ]);

        return res.render('property/create', {
            page: 'Crear Propiedad',
            navbar: true,
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errors: errors.array()
        });
    }

    console.log(req.body);
    res.send('Recibido');
}

export {
    getSeeMyProperties,
    getCreateProperty,
    postCreateProperty
}