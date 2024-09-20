const Sequelize = require("sequelize");

const sequelize = new Sequelize('BookingApptApp','root','Itsgreat_12345',{
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;