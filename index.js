import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import colors from "picocolors";

import authRouter from "./routes/authRouter.js";
import propertyRouter from './routes/propertyRouter.js';

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
    await database.authenticate(); //Test the connection
    await database.sync(); //Create the tables
    console.log( colors.green("[SUCCESS]: Database connection has been established successfully.") );
}catch(error){
    console.error( colors.red("[ERROR]: Unable to connect to the database:"), error );
}

//Enable pug as the view engine
app.set("view engine", "pug");
app.set("views", "./views");

//Enable static files (css, js, images) to be served from the public folder
app.use(express.static("public"));
 
app.use('/', propertyRouter);
app.use("/auth", authRouter);

const port = process.env.APP_PORT_BASE || 3000;

app.listen(port, function() {
    console.log(`\n${colors.green('[SUCCESS]:')} Server running on: ${colors.cyanBright(`http://localhost:${port}`)}\n`);
});




