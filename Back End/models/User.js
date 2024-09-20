const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name : Sequelize.STRING(100),
    email : {
        type : Sequelize.STRING(100),
        unique : true,
        allowNull : false
    },
    phone : {
        type : Sequelize.STRING(15),
        unique : true,
        allowNull : false
    }
})

module.exports = User;