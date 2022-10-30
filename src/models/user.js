const db = require('./../utils/db');

const createUser = (data) => {
    return new Promise((resolve, reject) => {
        try {
            db.push({
                id: db[db.length - 1].id + 1,
                name: data.name,
                username: data.username,
                email: data.email,
            })
            resolve({});
        } catch (error) {
            reject(error);
        }
    });
}
const userById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const list = db.filter(user => user.id === id);
            resolve(list);
        } catch (error) {
            reject(error);
        }
    });
}

const update = ({ id, name, username, email }) => {
    return new Promise((resolve, reject) => {
        try {
            db.map((user) => {
                if (user.id === Number(id)) {
                    if (name)
                        user.name = name;
                    if (username)
                        user.username = username;
                    if (email)
                        user.email = email;
                }
                return user;
            })
            resolve(db);
        } catch (error) {
            reject(error);
        }
    });
}

const findAll = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve(db);
        } catch (error) {
            //console.log(error)
            reject(error);
        }
    });
}
const deleteID = (id) =>{
    return new Promise((resolve,reject)=>{
        try {
            db.map((user,index)=>{
                if(user.id === Number(id)){
                    db.splice(index,1);
                }
                return user;
            });
            //console.log(db);
            resolve(db)
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createUser, userById, findAll, update, deleteID
}