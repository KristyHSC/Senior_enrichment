const sequelize = require('sequelize');
const conn = require('./conn');

const Campus = conn.define('campus', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        },
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        },
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: "http://lorempixel.com/640/480/business"
    }
})

module.exports = Campus;