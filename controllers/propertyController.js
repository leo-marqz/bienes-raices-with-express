import colors from 'picocolors';
import { check, validationResult } from 'express-validator';

import { Category, Price, Property } from '../models/index.js';

function getSeeMyProperties(req, res) {
    res.render('property/admin', {
        page: 'Mis Propiedades',
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
        csrfToken: req.csrfToken(),
        categories,
        prices,
        data: {}
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
    // await check('image').notEmpty().withMessage('La imagen es requerida').run(req);

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ]);

        return res.render('property/create', {
            page: 'Crear Propiedad',
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errors: errors.array(),
            data: req.body
        });
    }

    const {id: user_id} = req.user;
    const {title, description, category: category_id, price: price_id, rooms, parking, wc, street, latitude, longitude} = req.body;

    try{
        const property = await Property.create({
            title,
            description,
            category_id,
            price_id,
            rooms,
            parking,
            wc,
            street,
            latitude,
            longitude,
            user_id,
            image: ''
        });

        const {id} = property;

        return res.redirect(`/properties/add-image/${id}`);

    }catch(error){
        console.error(error);
    }
}

async function getAddImage(req, res) {
    const {id} = req.params;
    const property = await Property.findByPk(id);

    //validate if the property exists
    if(!property){
        console.error( colors.red('[DANGER]: La propiedad no existe') );
        return res.redirect('/');
    }

    //validate if the property is published
    if(property.published){
        console.error( colors.yellow('[DANGER]: La propiedad ya ha sido publicada') );
        return res.redirect('/');
    }

    //validate if the property belongs to the user
    if(property.user_id.toString() !== req.user.id.toString()){
        console.error( colors.red('[DANGER]:La propiedad no pertenece al usuario') );
        return res.redirect('/');
    }

    console.log( colors.green('[SUCCESS]: La propiedad es válida') );

    return res.render('property/add-image', {
        page: 'Agregar Imagen: ' + property.title,
        csrfToken: req.csrfToken(),
        property
    })
}

async function postAddImage(req, res) {
    const {id} = req.params;
    const property = await Property.findByPk(id);

    //validate if the property exists
    if(!property){
        console.error( colors.red('[DANGER]: La propiedad no existe') );
        return res.redirect('/');
    }

    //validate if the property is published
    if(property.published){
        console.error( colors.yellow('[DANGER]: La propiedad ya ha sido publicada') );
        return res.redirect('/');
    }

    //validate if the property belongs to the user
    if(property.user_id.toString() !== req.user.id.toString()){
        console.error( colors.red('[DANGER]:La propiedad no pertenece al usuario') );
        return res.redirect('/');
    }

    console.log( colors.green('[SUCCESS]: La propiedad es válida') );
    
    return res.send( colors.green('[SUCCESS]: Imagen subida') );
}

export {
    getSeeMyProperties,
    getCreateProperty,
    postCreateProperty,
    getAddImage,
    postAddImage
}