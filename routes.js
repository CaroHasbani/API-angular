// vamos  a hacer la parte de rutas
import { getTest } from "./controllers/test.controllers.js"
import { addToCart, clearCart, getCart, removeFromCart } from "./controllers/cart.controller.js";
import { addUser, getUsers, removeUser, updateUser, validateCredentials } from "./controllers/login.controller.js";
// importo la jwt
import  jwt  from "jsonwebtoken";
// necesito la clave
import { SECRET_KEY } from "./config/config.js";
import express from "express";

// necesito exportarlas
export const routes=(app)=>{
    // Atrapa todas las rutas que sean 
    app.route("/api/test").get(getTest);
    // agrego un nuevo endpoint y vinculo la funcion 
    app.route("/api/cart").get(getCart);
    app.route("/api/cart").post(addToCart);
    app.route("/api/cart").delete(removeFromCart);
    app.route("/api/cart/clear").get(clearCart);
    // para el login
    app.route("/api/login").post(validateCredentials);
    app.route("/api/login").get(getUsers);
    app.route("/api/login/add").post(addUser);
    app.route("/api/login").delete(removeUser);
    app.route("/api/login").put(updateUser);

}

// const checkToken = express.Router(); 
// checkToken.use((req, res, next) => {
//     const token = req.headers['Authorization'];
	
//     if (token) {
//       jwt.verify(token, SECRET_KEY, (err, decoded) => {      
//         if (err) {
//             return res.json({ 
//                 status: 'NOK',
//                 mensaje: 'Token inválido' 
//             });    
//         } else {
//           req.decoded = decoded;    
//           next();
//         }
//       });
//     } else {
//       res.send({ 
//         status: 'NOK',
//         mensaje: 'Token no provisto' 
//       });
//     }
//  });
