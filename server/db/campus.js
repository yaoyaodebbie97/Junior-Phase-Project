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
        defaultValue: "https://media.gettyimages.com/photos/student-wears-a-facemask-at-the-university-of-southern-california-in-picture-id1206596174?s=612x612"
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

  