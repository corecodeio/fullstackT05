const { pool } = require('./../utils/oracle');

const personToken = ({ person_token }) => {
    const bindings = {
        person_token: person_token
    }
    const SQL_PERSON_TOKEN = `SELECT
                                ID AS "id",
                                EMAIL AS "email"
                                FROM PERSON
                                WHERE TOKEN = :person_token`;
    return pool(SQL_PERSON_TOKEN, bindings);
}
module.exports = {
    personToken
}