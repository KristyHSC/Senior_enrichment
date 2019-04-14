const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.URL ||
    ' postgres://localhost:5432/senior_enrichment' );

module.exports = conn;