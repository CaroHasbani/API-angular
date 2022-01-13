// importo la jwt
import  jwt  from "jsonwebtoken";
// necesito la clave
import { SECRET_KEY } from "../config/config.js";

// defino un array con usuarios para poder empezar a utilizar la aplicación
const arrayUser = [
    {
        email:"admin@gmail.com",
        name: "Administrador",
        password: "12345678",
        role: "admin"
    },
    {
        email:"user@gmail.com",
        name: "carolina",
        password: "12345678",
        role: "user"
    }
];

//Metodo get
export const getUsers = (req, res) => {
    res.send(arrayUser);
}

// Validación usuarios
export const validateCredentials = (req, res) => {
    const credentials = req.body;
    const indexUser = arrayUser.findIndex(user => user.name === credentials.user)
    if(indexUser>=0){
            const payload ={

                email: arrayUser[indexUser].email,
                name: arrayUser[indexUser].name,
                password:arrayUser[indexUser].password,
                role: arrayUser[indexUser].role
            }
            const token = jwt.sign(payload,SECRET_KEY);
            res.json({
                status: 'OK',
                token: token,
                message: 'Valid user',
            })
            
        }else{
            res.json({
                status: 'NOT OK',
                message: 'Invalid user or password'
            })
        }
}

export const addUser=(req,res)=>{
     const userToAdd= req.body;
     // eso me trae el json
     // lo pusheo
     if (arrayUser.findIndex(user=> user.name === userToAdd.name)<0){
         arrayUser.push(userToAdd);
         res.send({
             status:"ok",
             arrayUser
         })
     } else{
         res.send({
             status:" not ok",
              // quiero que me devuelva el array de usuarios actualizado
             arrayUser
         })
     }
   
 }

 export const removeUser=(req,res)=>{
    const name= req.query.name;
    const indexToRemove =  arrayUser.findIndex(user=>user.name===name);
    if(indexToRemove>=0){
        arrayUser.splice(indexToRemove,1);
      res.send({
        status:'User deleted',
        arrayUser
      });
    }else{
      res.send({
        status: 'Cannot find name',
        arrayUser
      })
    }
  
  }