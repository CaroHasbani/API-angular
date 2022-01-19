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
    app.route("/api/cart").get(checkToken, getCart);
    app.route("/api/cart").post(checkToken, addToCart);
    app.route("/api/cart").delete(checkToken, removeFromCart);
    app.route("/api/cart/clear").get(checkToken, clearCart);
    // para el login
    app.route("/api/login").post( validateCredentials);
    app.route("/api/login").get( getUsers);
    app.route("/api/login/add").post(checkToken, addUser);
    app.route("/api/login").delete(checkToken, removeUser);
    app.route("/api/login").put(checkToken, updateUser);

}

const checkToken = express.Router();  
checkToken.use((req, res, next) => {

    let token = req.headers['authorization'];
    token = token.replace('Bearer ', '')

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    status: 'NOT - OK',
                    mensaje: 'Invalid token'
                });
            } else {
               
                req.decoded = decoded;    
                next();
            }
        });
    } else {
        res.send({
            status: 'NOT - OK',
            mensaje: 'Token not given'
        });
    }
});