import colors from 'picocolors';
import { unlink } from 'node:fs/promises'
import { check, validationResult } from 'express-validator';

import { Category, Price, Property } from '../models/index.js';

async function getSeeMyProperties(req, res) {

    const { id } = req.user;

    const properties = await Property.findAll({ where: { 
            user_id: id
        },
        include: [
            {model: Category},
            {model: Price}
        ]});

    res.render('property/admin', {
        page: 'Mis Propiedades',
        csrfToken: req.csrfToken(),
        properties
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

async function postAddImage(req, res, next) {
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

    try{

        property.image = req.file.filename;
        property.published = 1;
        await property.save();

        next(); //continue with the next middleware

    }catch(error){
        console.error( colors.red('[DANGER]: Error al subir la imagen: ' + error) );
    }
    console.log( colors.green('[SUCCESS]: Imagen subida') );
    
    res.redirect('/my-properties');
}

async function getEditProperty(req, res){
    const { id } = req.params;

    const property = await Property.findByPk(id);

    if(!property){
        console.error( colors.red('[DANGER]: La propiedad no existe') );
        return res.redirect('/');
    }

    if(property.user_id.toString() !== req.user.id.toString()){
        console.error( colors.red('[DANGER]: La propiedad no pertenece al usuario') );
        return res.redirect('/');
    }

    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]);

    res.render('property/edit', {
        page: 'Editar Propiedad',
        csrfToken: req.csrfToken(),
        categories,
        prices,
        data: property
    });

}

async function postEditProperty(req, res){

    console.log( colors.green('[SUCCESS]: Editando propiedad') );

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

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ]);

        return res.render('property/edit', {
            page: 'Editar Propiedad',
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errors: errors.array(),
            data: req.body
        });
    }

    const { id } = req.params;

    const property = await Property.findByPk(id);

    if(!property){
        console.error( colors.red('[DANGER]: La propiedad no existe') );
        return res.redirect('/');
    }

    if(property.user_id.toString() !== req.user.id.toString()){
        console.error( colors.red('[DANGER]: La propiedad no pertenece al usuario') );
        return res.redirect('/');
    }

    
    try{
        const {title, description, category: category_id, price: price_id, rooms, parking, wc, street, latitude, longitude} = req.body;
        property.set({
            title,
            description,
            category_id,
            price_id,
            rooms,
            parking,
            wc,
            street,
            latitude,
            longitude
        });

        await property.save();

        return res.redirect('/my-properties');
    }catch(error){
        console.error( colors.red('[DANGER]: Error al editar la propiedad: ' + error) );
    }
   
}

async function postDeleteProperty(req, res){
    const { id } = req.params;

    const property = await Property.findByPk(id);

    if(!property){
        console.error( colors.red('[DANGER]: La propiedad no existe') );
        return res.redirect('/');
    }

    if(property.user_id.toString() !== req.user.id.toString()){
        console.error( colors.red('[DANGER]: La propiedad no pertenece al usuario') );
        return res.redirect('/');
    }

    await unlink(`public/uploads/images/${property.image}`);

    console.log( colors.green('[SUCCESS]: Imagen eliminada') );

    await property.destroy();

    console.log( colors.green('[SUCCESS]: Propiedad eliminada') );

    res.redirect('/my-properties');

}


export {
    getSeeMyProperties,
    getCreateProperty,
    postCreateProperty,
    getAddImage,
    postAddImage,
    getEditProperty,
    postEditProperty,
    postDeleteProperty
}