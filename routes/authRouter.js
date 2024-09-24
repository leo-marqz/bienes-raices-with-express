import express from "express";

const authRouter = express.Router();

authRouter.get("/", function(req, res) {
    res.send("Hello World from Auth!");
});

authRouter.get('/profile', function(req, res) {
    res.json({ message: 'This is the profile page' });
});

authRouter.get("/login", function(req, res){});
authRouter.post("/login", function(req, res){});

authRouter.get("/register", function(req, res){});
authRouter.post("/register", function(req, res){});

authRouter.get("/logout", function(req, res){});

export default authRouter;