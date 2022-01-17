// importo la jwt
import jwt from "jsonwebtoken";
// necesito la clave
import { SECRET_KEY } from "../config/config.js";
// defino un array con usuarios para poder empezar a utilizar la aplicación
const arrayUser = [
  {
    id: "00",
    email: "admin@gmail.com",
    name: "Administrador",
    password: "12345678",
    role: "admin",
  },
  {
    id: "000",
    email: "user@gmail.com",
    name: "carolina",
    password: "12345678",
    role: "user",
  },
];

//Metodo get
export const getUsers = (req, res) => {
  res.send(arrayUser);
};

// Validación usuarios
export const validateCredentials = (req, res) => {
  const credentials = req.body;
  const indexUser = arrayUser.findIndex(
    (user) => user.name === credentials.user
  );

  if (indexUser >= 0) {
    const payload = {
      id: arrayUser[indexUser].id,
      email: arrayUser[indexUser].email,
      name: arrayUser[indexUser].name,
      password: arrayUser[indexUser].password,
      role: arrayUser[indexUser].role,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    res.json({
      status: "OK",
      token: token,
      message: "Valid user",
    });
  } else {
    res.json({
      status: "NOT OK",
      message: "Invalid user or password",
    });
  }
};
// metodo post
export const addUser = (req, res) => {
  const userToAdd = req.body;
  // eso me trae el json
  // lo pusheo
  if (arrayUser.findIndex((user) => user.name === userToAdd.name) < 0) {
    // if (arrayUser.findIndex(user=> user.id === userToAdd.id)<0){
    arrayUser.push(userToAdd);
    res.send({
      status: "OK",
      arrayUser,
    });
  } else {
    res.send({
      status: " NOT OK",
      arrayUser,
    });
  }
};

// metodo delete

export const removeUser = (req, res) => {
  const name = req.query.name;
  //  const id= Number(req.query.id);

  const indexToRemove = arrayUser.findIndex((user) => user.name === name);
  // const indexToRemove =  arrayUser.findIndex(user=>user.id===id);
  if (indexToRemove >= 0) {
    arrayUser.splice(indexToRemove, 1);
    res.send({
      status: "User deleted",
      arrayUser,
    });
  } else {
    res.send({
      // status: 'Cannot find id',
      status: "Cannot find name",
      arrayUser,
    });
  }
};

// metodo put
export const updateUser = (req, res) => {
  const userToUpdate = req.body;
  const index = arrayUser.findIndex((user) => user.id === userToUpdate.id);
  if (index >= 0) {
    arrayUser[index] = userToUpdate;
    res.send({
      status: "User updated",
      arrayUser,
    });
  } else {
    res.send({
      status: " Cannot find id",
      arrayUser,
    });
  }
};
