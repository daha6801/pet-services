module.exports = {
    USER : "sa",
    PASSWORD: "mypassword1A1",
    HOST: "localhost",
    port: 49739,
    DB: "petservices",
    dialect: "mssql",
    
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};