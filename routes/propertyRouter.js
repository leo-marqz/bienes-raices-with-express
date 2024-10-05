import { 
    getSeeMyProperties, getCreateProperty, 
    postCreateProperty 
} from "../controllers/propertyController.js";

import express from "express";

const router = express.Router();

router.get('/', getSeeMyProperties);
router.get('/see-my-properties', getSeeMyProperties);

router.get('/properties/create', getCreateProperty);
router.post('properties/create', postCreateProperty);


export default router;