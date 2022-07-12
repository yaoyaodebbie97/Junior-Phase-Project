const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define('Student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        notEmpty: true
      }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
      }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: "http://dailytrojan.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-28-at-1.21.48-AM.png"
    },
   
    gpa: {
      type: Sequelize.DECIMAL,
      validate:{
          min: 0.0,
          max: 4.0
      }
    },
  });