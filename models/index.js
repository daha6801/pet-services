//Connect to the db

const dbconfig = require("../config/dbconfig.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
  port: dbconfig.port,
  pool: {
    max: dbconfig.pool.max,
    min: dbconfig.pool.min,
    acquire: dbconfig.pool.acquire,
    idle: dbconfig.pool.idle
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const db = {};
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  db.users = require("./users.js")(sequelize, Sequelize);
  db.services = require("./services.js")(sequelize, Sequelize);
  
  sequelize.sync({ alter: true });

  module.exports = db;