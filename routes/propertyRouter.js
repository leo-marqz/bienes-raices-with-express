import { 
    getSeeMyProperties, getCreateProperty, 
    postCreateProperty 
} from "../controllers/propertyController.js";

import express from "express";
import protectPrivateRoutesMiddleware from "../middlewares/protectPrivateRoutes.js";

const router = express.Router();

router.get('/', protectPrivateRoutesMiddleware, getSeeMyProperties);
router.get('/my-properties', protectPrivateRoutesMiddleware, getSeeMyProperties);

router.get('/properties/create', protectPrivateRoutesMiddleware, getCreateProperty);
router.post('/properties/create', protectPrivateRoutesMiddleware,  postCreateProperty);


export default router;