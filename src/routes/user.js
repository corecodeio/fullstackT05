const express = require('express');
const route = express.Router();
const { getUser, getByID, postUser, patchUser, deleteUser, putUser } = require('./../controllers/user');

const middelware = (req, res, next) => {
    //verificacion
    const data= {
        datoUno:'daadsdsa',
        datoDos:'dsadsd'
    }
    req.body.data = data;
    next();
}
route.get('/user',middelware, getUser);
route.get('/user/:id', getByID);
route.post('/user', postUser);
route.patch('/user', patchUser);
route.put('/user', putUser);
route.delete('/user/:id',deleteUser);

module.exports = route;