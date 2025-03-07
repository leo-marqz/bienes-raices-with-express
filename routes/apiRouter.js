import express from "express";

import { getProperties } from "../controllers/ApiController.js";

const router = express.Router();


router.get('/properties', getProperties);

export default router;