const { oracleConfig } = require('./../config/config');
const oracledb = require('oracledb');
const path = require('path');

//path to client 
const oracleClient = path.join('C:', 'oracle_w64', 'db_home', 'bin');

//init client
oracledb.initOracleClient({ libDir: oracleClient });

//start
module.exports.start = async () => {
    await oracledb.createPool(oracleConfig);
}
//close
module.exports.close = async () => {
    await oracledb.getPool().close(0);
}
//request handler
module.exports.pool = async (statement, binds = [], opts = {}) => {
    let conn;
    let result = [];
    opts.outFormat = oracledb.OBJECT;
    try {
        conn = await oracledb.getConnection();
        result = await conn.execute(statement, binds, opts);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.log(error);
            }
        };
    };
};