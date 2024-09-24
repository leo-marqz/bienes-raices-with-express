import express from "express";
import { getLogin, postLogin } from "../controllers/authController.js";

const router = express.Router();


router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/register", (req, res)=> res.render("auth/register.pug") );
router.post("/register", function(req, res){});

router.get("/logout", function(req, res){});

export default router;