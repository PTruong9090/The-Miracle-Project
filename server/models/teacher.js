const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('Teacher', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        first: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    
    Teacher.associate = (models) => {
        Teacher.hasMany(models.Class, {
            onDelete: "cascade"
        })
    }
    
    return Teacher;
}

