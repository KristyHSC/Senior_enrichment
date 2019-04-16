const Sequelize = require('sequelize');
const conn = require('./conn');

const Student = conn.define('student', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      },
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      },
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
        isEmail: true
      },
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: "https://media1.tenor.com/images/c8c37be4b0cf7a4e1253a24f9029b723/tenor.gif?itemid=8217376"
    },
    gpa: {
      type: Sequelize.FLOAT(2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0.0,
        max: 4.0
      }
    }
})

module.exports = Student;