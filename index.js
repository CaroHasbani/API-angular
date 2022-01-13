import express from "express";
import bodyParser from "body-parser";
import { routes } from "./routes.js";
import cors from "cors";


const app=express();
// me llamo  a la funcion express que me va 


// la aplicacion necesita escuchar un puerto particular
const port=3000;
// y tmb necesita hostname
const hostname="localhost";
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

// se queda escuchando
routes(app);

// le decimos a la app que se quede escuchando el puerto en el host name y cuando termine de escuchar invoque a la funcion:
app.listen(port,hostname,() =>{
    console.log("movies api server online in  https://"+ hostname + ":"+ port);
})
// cuando corro el index se sigue ejecutando --> node index.js --> tengo que cortar cada vez que hago un cambio (control c)

// me falta enganchar una funcion de js con un endpoint y un verbo (hacer el ruteo) ---> creo un nuevo archivo

