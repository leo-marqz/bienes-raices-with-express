import express from "express";
import authRouter from "./routes/authRouter.js";

const app = express();

app.get("/", (req, res)=>res.send("Hello World from Express!"));

app.use("/auth", authRouter);

app.set("view engine", "pug");
app.set("views", "./views");

app.listen(3000, function() {
    console.log("Server is listening on: http://localhost:3000");
});




