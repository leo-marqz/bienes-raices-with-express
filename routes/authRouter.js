import express from "express";
import { getLogin, getRegister, postLogin, postRegister, getForgotPassword, getLogout, getConfirmAccount, postForgotPassword, postResetPassword, getResetPassword } from "../controllers/authController.js";

const router = express.Router();


router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/register", getRegister);
router.post("/register", postRegister);

router.get("/forgot-password", getForgotPassword);
router.post("/forgot-password", postForgotPassword);

router.get('/get-reset-password/:token', getResetPassword);
router.post('/reset-password/:token', postResetPassword);

router.get('/confirm-account/:token', getConfirmAccount);

router.get("/logout", getLogout);

export default router;