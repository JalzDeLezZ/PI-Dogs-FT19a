const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breed', {
    id: {
      type: DataTypes.UUID, // genera un num random unico, es un datatype predeterminado de sequelize
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, // no puede estar vacío, por eso está en false
      primaryKey : true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    life_span: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  });
}; 
