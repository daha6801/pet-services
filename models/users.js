
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
  return User;
};

    


