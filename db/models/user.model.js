const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
	id : {
		allowNull : false,
		autoIncrement : true,
		primaryKey : true
	}
}

