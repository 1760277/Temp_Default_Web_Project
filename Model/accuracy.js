
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const DB = require('./db');
const { create } = require('./custom');
const MODEL = SEQUELIZE.Model;

class Accuracy extends MODEL{
  

 }
 Custom.init({
     areaCreate:{
        type: SEQUELIZE.STRING,
    },
    createDate:{
        type: SEQUELIZE.STRING,
    },
},{
        sequelize: DB,
        modelName: 'accuracy',
 });

module.exports = Accuracy;