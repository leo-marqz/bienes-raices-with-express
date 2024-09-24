import express from "express";
import { getLogin, getRegister, postLogin, postRegister } from "../controllers/authController.js";

const router = express.Router();


router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/register", getRegister);
router.post("/register", postRegister);

router.get("/logout", (req, res) => res.send("Logout"));

export default router;