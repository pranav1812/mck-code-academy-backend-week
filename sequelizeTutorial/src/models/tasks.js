const {
    Model,
    DataTypes
} = require('sequelize');

// create a sequelize model for the tasks table
module.exports= (sequelize, DataTypes) => {
    class Tasks extends Model {
        static associate(models) {
            // define association here
        }
    }
    Tasks.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: DataTypes.STRING,
        isComplete: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Tasks',
        timestamps: false,
    });
    return Tasks;
}
