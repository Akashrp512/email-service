const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const ContactForm = sequelize.define("ContactForm", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return ContactForm;
};