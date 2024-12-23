import express from "express";

import {home, categories, pageNotFound, search} from "../controllers/appController.js";
import {Property} from "../models/index.js";

const router = express.Router();

router.get('/', home);
router.get('/categories/:id', categories);
router.get('/search', search);
router.get('/404', pageNotFound);

export default router;