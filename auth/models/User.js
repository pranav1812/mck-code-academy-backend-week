const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
    }
    User.init({
        username: {type: DataTypes.STRING, unique: true, primaryKey: true, allowNull: false},
        password: {type: DataTypes.STRING, unique: true, primaryKey: true, allowNull: false},
    }, {
        freezeTableName: true,
        sequelize,
        modelName: 'User',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return User;
}