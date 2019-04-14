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
      defaultValue: "http://lorempixel.com/640/480/people"
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