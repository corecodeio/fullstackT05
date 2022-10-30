const { pool } = require('./../utils/oracle');

const registerCategory = ({ id, name, description }) => {

    const bindings = {
        id,
        name,
        description
    }
    const SQL_REGISTER_CATEGORY = `INSERT INTO CATEGORY (ID,PERSON_ID,NAME,DESCRIPTION,ADD_DATE)
        VALUES(SQ_CATEGORY.NEXTVAL,:id,:name,:description,SYSDATE);`;
    return pool(SQL_REGISTER_CATEGORY, bindings, { autoCommit: true });
}
module.exports = {
    registerCategory,
}