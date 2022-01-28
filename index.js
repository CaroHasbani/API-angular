import express from "express";
import bodyParser from "body-parser";
import { routes } from "./routes.js";
import cors from "cors";


const app=express();
const port=3000;
const hostname="localhost";

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


routes(app);
app.listen(port,hostname,() =>{
    console.log("movies api server online in  https://"+ hostname + ":"+ port);
})


