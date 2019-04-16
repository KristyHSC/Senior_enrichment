const sequelize = require('sequelize')
const conn = new sequelize(process.env.URL ||
    ' postgres://localhost:5432/senior_enrichment' );

module.exports = conn;