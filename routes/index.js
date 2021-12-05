var express = require('express');
var router = express.Router();
var db = require("../models");


/* GET home page. */
router.get('/', async function(req, res, next) { 
  try {
    await db.services.sync({ force: true });
   db.services.bulkCreate([
      { service_type: 'grooming', service_fee: 90 },
      { service_type: 'training', service_fee: 120 },
      { service_type: 'daycare', service_fee: 30 }
    ]).then(function() {
      return db.services.findAll();
    }).then(function(data) {
      console.log(data);
      res.render('index', { title: 'Express', userData: data});
    });
  }catch (err){
    return res.json({status: 'error', message: err.message});
  };

});

module.exports = router;
