import express from "express";
import { getLogin, getRegister, postLogin, postRegister, getForgotPassword, getLogout, getConfirmAccount, postForgotPassword, postResetPassword, getResetPassword } from "../controllers/authController.js";

const router = express.Router();


router.get("/login", getLogin); //form to login
router.post("/login", postLogin); //login

router.get("/register", getRegister); //form to register
router.post("/register", postRegister); //register

router.get("/forgot-password", getForgotPassword); //form to request password reset
router.post("/forgot-password", postForgotPassword); //send email with instructions to reset password

router.get('/reset-password/:token', getResetPassword); //form to reset password
router.post('/reset-password/:token', postResetPassword); //reset password

router.get('/confirm-account/:token', getConfirmAccount); //confirm account

router.get("/logout", getLogout); //logout

export default router;