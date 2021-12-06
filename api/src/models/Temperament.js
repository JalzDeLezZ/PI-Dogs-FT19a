const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('temperament', {
      //el ID me lo genera solo
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};