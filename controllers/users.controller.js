
//import db from '../models';
//const DB:any = db;
//const {User} = DB;
//const Op = db.Sequelize.Op;
const db = require('../models');
const User = db.users;

exports.create = (req, res) => {
  // Validate request
  if (!req.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a user
  const user = {
    email: req.email,
    username: req.username,
    password: req.password
  };

  // Save user in the database
    User.create(user).then(data => {
      console.log("Users's auto-generated ID:", data.id);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};