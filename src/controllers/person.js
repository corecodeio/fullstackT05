const Person = require('./../models/person');
const bcrypt = require('bcryptjs');

const regiterPerson = async (req, res, next) => {
    const args = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // { rows, outBinds }
        const { outBinds } = await Person.register(args);
        console.log(outBinds);
        res.status(200)
            .cookie('auth_token', outBinds.person_token[0])
            .json({
                message: 'Person was registed successfuly.',
                person_toke: outBinds.person_token[0]
            })
    } catch (error) {
        res.status(400)
            .json({ message: error })
    }
}
const loginPerson = async (req, res, next) => {
    let args = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // { rows, outBinds }
        const { rows: hashPasswordRows } = await Person.hashPassword(args);
        //console.log(hashPasswordRows);
        if (hashPasswordRows.length > 0) {
            const hashPassword = hashPasswordRows[0]['PASSWORD'];
            if (bcrypt.compareSync(args.password, hashPassword)) {
                args = {
                    email: args.email,
                    password : hashPassword
                }
                const {outBinds} = await Person.login(args);
                //console.log(outBinds);
                return res.status(200)
                .cookie('auth_token', outBinds.person_token[0],{expire : new Date() + 9999})
                .json({
                    message: 'Login successfuly.',
                    person_toke: outBinds.person_token[0]
                })
            }
        }
        res.status(200)
            .json({
                message: 'datos invalidos.'
            })
    } catch (error) {
        console.log(error)
        res.status(400)
            .clearCookie('auth_token')
            .json({ message: error })
    }
}

module.exports = {
    regiterPerson, loginPerson
}