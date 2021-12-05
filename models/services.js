'use strict';
module.exports = (sequelize, Sequelize) => {
  var Service = sequelize.define("services", {
    service_type: {
        type: Sequelize.STRING
    },
    service_fee: {
      type: Sequelize.INTEGER
    }
    
  });

  return Service;
};
