const SEQUELIZE = require('sequelize');

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:katthynguyen01@localhost:5432/BeautyBank'
const db = new SEQUELIZE(connectionString);

module.exports = db;

