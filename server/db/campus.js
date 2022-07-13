const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define('Campus', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqSTHcT0W1-VEe3h4pr0gKnRNwnY_tdD2-xQ&usqp=CAU"
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
      }
    },
    description: {
      type: Sequelize.TEXT,
    },
  });

  