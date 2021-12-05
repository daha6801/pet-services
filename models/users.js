
'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  var User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  User.associate = function (models) {

  };

  User.prototype.validPassword = function (password) {
    if (password.length >= 8) {
      return true;
    }
    return false;
  };

  return User;
};

    


