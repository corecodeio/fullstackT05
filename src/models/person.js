const { pool } = require('./../utils/oracle');
const oracledb = require('oracledb');
const bcrypt = require('bcryptjs');

const register = ({ email, password }) => {
    //password = bcrypt.hashSync(password,8);
    //const bindings = ['saas@gmail.com', '1234']
    const bindings = {
        email: email,
        password: bcrypt.hashSync(password, 8),
        person_token: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
    }
    const SQL_REGISTER_PERSON = `INSERT INTO PERSON (ID,EMAIL,PASSWORD,TOKEN)
                                    VALUES(SQ_PERSON.NEXTVAL, :email, :password, API_TOKEN(TO_CHAR(SYSDATE,'DD-MM-YYYY HH24:MI:SS') || :password) )
                                    RETURNING TOKEN INTO :person_token`;
    return pool(SQL_REGISTER_PERSON, bindings, { autoCommit: true });
}
const hashPassword = ({email})=>{
    const bindings = {
        email: email,
    }
    const SQL_HASH_PASSWORD = `SELECT PASSWORD FROM PERSON WHERE EMAIL = :email`;
    return pool(SQL_HASH_PASSWORD, bindings);
}
const login = ({ email, password }) => {
    const bindings = {
        email: email,
        password: password,
        person_token: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
    }
    const SQL_LOGIN = `UPDATE PERSON
                        SET
                            TOKEN = API_TOKEN(TO_CHAR(SYSDATE,'DD-MM-YYYY HH24:MI:SS') || :password),
                            MOD_DATE = SYSDATE
                            WHERE EMAIL = :email
                            RETURNING TOKEN INTO :person_token`;
    return pool(SQL_LOGIN, bindings, { autoCommit: true });
}
module.exports = {
    register,
    hashPassword,
    login
}