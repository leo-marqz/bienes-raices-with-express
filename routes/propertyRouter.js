import { getSeeMyProperties } from "../controllers/propertyController.js";

import express from "express";

const router = express.Router();

router.get("/", (req, res)=>res.send("Hello World from Express!"));
router.get('/see-my-properties', getSeeMyProperties);


export default router;