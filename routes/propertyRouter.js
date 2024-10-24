import { 
    getSeeMyProperties, getCreateProperty, 
    postCreateProperty, 
    getAddImage,
    postAddImage
} from "../controllers/propertyController.js";

import express from "express";
import protectPrivateRoutesMiddleware from "../middlewares/protectPrivateRoutes.js";

const router = express.Router();

router.get('/', protectPrivateRoutesMiddleware, getSeeMyProperties);
router.get('/my-properties', protectPrivateRoutesMiddleware, getSeeMyProperties);

router.get('/properties/create', protectPrivateRoutesMiddleware, getCreateProperty);
router.post('/properties/create', protectPrivateRoutesMiddleware,  postCreateProperty);

router.get('/properties/add-image/:id', protectPrivateRoutesMiddleware, getAddImage);
router.post('/properties/add-image/:id', protectPrivateRoutesMiddleware, postAddImage);


export default router;