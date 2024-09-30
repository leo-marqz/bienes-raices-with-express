import express from "express";
import { getLogin, getRegister, postLogin, postRegister, getForgotPassword, getLogout, getConfirmAccount } from "../controllers/authController.js";

const router = express.Router();


router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/register", getRegister);
router.post("/register", postRegister);

router.get("/forgot-password", getForgotPassword);

router.get('/confirm-account/:token', getConfirmAccount);

router.get("/logout", getLogout);

export default router;