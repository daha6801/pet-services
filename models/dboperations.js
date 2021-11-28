var config = require('./config/dbconfig');

const sql = require('mssql');

async function getUsers(){
    try{
        let pool = await sql.connect(config);
        console.log('Successfully connected to the sql server express database');
        let Users = await pool.request().query("SELECT * from users");
        return Users.recordsets;
    }
    catch(error) {
        console.log(error);
    }
}