import express from "express";
import authRouter from "./routes/authRouter.js";

const app = express();

//Enable pug as the view engine
app.set("view engine", "pug");
app.set("views", "./views");

//Enable static files (css, js, images) to be served from the public folder
app.use(express.static("public"));

app.get("/", (req, res)=>res.send("Hello World from Express!"));

app.use("/auth", authRouter);


app.listen(3000, function() {
    console.log("Server is listening on: http://localhost:3000");
});




