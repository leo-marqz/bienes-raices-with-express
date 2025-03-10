import { 
    getSeeMyProperties, getCreateProperty, postCreateProperty, 
    getAddImage,postAddImage,getEditProperty,postEditProperty, 
    postDeleteProperty, getProperty } from "../controllers/PropertyController.js";

import express from "express";
import protectPrivateRoutesMiddleware from "../middlewares/protectPrivateRoutes.js";
import uploadImageMiddleware from "../middlewares/uploadImage.js";

const router = express.Router();

// router.get('/', protectPrivateRoutesMiddleware, getSeeMyProperties);
router.get('/my-properties', protectPrivateRoutesMiddleware, getSeeMyProperties);

router.get('/properties/create', protectPrivateRoutesMiddleware, getCreateProperty);
router.post('/properties/create', protectPrivateRoutesMiddleware,  postCreateProperty);

router.get('/properties/add-image/:id', protectPrivateRoutesMiddleware, getAddImage);
router.post('/properties/add-image/:id', 
    protectPrivateRoutesMiddleware, 
    uploadImageMiddleware.single('image'),
    postAddImage
);

router.get('/properties/edit/:id', protectPrivateRoutesMiddleware, getEditProperty);
router.post('/properties/edit/:id', protectPrivateRoutesMiddleware, postEditProperty);

router.post('/properties/delete/:id', protectPrivateRoutesMiddleware, postDeleteProperty);


//public
router.get('/properties/:id', getProperty);

export default router;