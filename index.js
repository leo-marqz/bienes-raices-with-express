import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRouter.js";
import database from "./configurations/database.js";

const app = express();

//Enable the use of req.body | form data
app.use( express.urlencoded({extended: true}) );

//Enable the use of cookies
app.use( cookieParser() );

//Enable CSRF protection
app.use( csrf({cookie: true}) );

//Connect to the database
try {
    await database.authenticate();
    await database.sync();
    console.log("Connection has been established successfully.");
}catch(error){
    console.error("Unable to connect to the database:", error);
}

//Enable pug as the view engine
app.set("view engine", "pug");
app.set("views", "./views");

//Enable static files (css, js, images) to be served from the public folder
app.use(express.static("public"));

app.get("/", (req, res)=>res.send("Hello World from Express!"));
app.use("/auth", authRouter);

const port = process.env.APP_PORT_BASE || 3000;

app.listen(port, function() {
    console.log(`Server running on http://localhost:${port}`);
});




