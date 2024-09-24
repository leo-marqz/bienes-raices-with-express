import express from "express";
import authRouter from "./routes/authRouter.js";

const app = express();

app.get("/", function(req, res) {
    res.send("Hello World!");
});

app.use("/auth", authRouter);

app.listen(3000, function() {
    console.log("Server is listening on: http://localhost:3000");
});




